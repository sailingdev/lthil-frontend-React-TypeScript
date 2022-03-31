import { BigNumber, Contract, Transaction, ethers } from 'ethers'
import { IInputPosition, IPosition } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'
import tokenList from './../assets/tokenlist.json'

export class MarginTrading {
  private provider!: ethers.providers.Web3Provider
  private signer!: ethers.providers.JsonRpcSigner
  private contract!: Contract

  constructor(
    provider: ethers.providers.Web3Provider,
    signer: ethers.providers.JsonRpcSigner,
  ) {
    this.provider = provider
    this.signer = signer
    this.contract = ContractFactory.getMarginTradingStrategyContract(
      this.signer,
    )
  }
  async computeMaxAndMin({
    positionType,
    priority,
    ...positionData
  }: IInputPosition): Promise<[BigNumber, BigNumber]> {
    const margin = Ether.parseUnits(
      positionData.margin.toString(),
      positionData.spentToken,
    )!
    const leverage = BigNumber.from(positionData.leverage)
    const slippage = BigNumber.from(positionData.slippage)

    const base = BigNumber.from(1).sub(slippage.div(100))

    const [minObtainedQuote] = await this.contract.quote(
      positionData.spentToken,
      positionData.obtainedToken,
      margin.mul(leverage).toHexString(),
    )

    const [maxSpentQuote] = await this.contract.quote(
      positionData.obtainedToken,
      positionData.spentToken,
      margin.mul(leverage).toHexString(),
    )

    if (positionType === 'long') {
      if (priority === 'buy') {
        return [margin.mul(leverage).div(base), minObtainedQuote]
      } else {
        return [margin.mul(leverage), minObtainedQuote.mul(base)]
      }
    } else {
      if (priority === 'buy') {
        return [maxSpentQuote.div(base), margin.mul(leverage)]
      } else {
        return [maxSpentQuote, margin.mul(leverage).mul(base)]
      }
    }
  }
  async closePosition(positionId: string): Promise<Transaction> {
    try {
      return this.contract.closePosition(positionId, {
        gasLimit: 10000000,
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async openPosition(positionData: IInputPosition): Promise<any> {
    const { spentToken, obtainedToken, deadline, margin, positionType } =
      positionData

    const marginValue = Ether.parseUnits(margin.toString(), spentToken)

    const [maxSpent, minObtained] = await this.computeMaxAndMin(positionData)

    try {
      const position = await this.contract.openPosition(
        {
          spentToken,
          obtainedToken,
          // deadline should be integer representing minutes
          deadline: BigNumber.from(
            Math.floor(Date.now() / 1000) + 60 * deadline,
          ).toHexString(),
          collateral: marginValue!.toHexString(),
          collateralIsSpentToken: positionType === 'long' ? true : false,
          minObtained: minObtained.toHexString(),
          maxSpent: maxSpent.toHexString(),
        },
        {
          gasLimit: 10000000,
        },
      )
      return position
    } catch (error) {
      console.log(error)
    }
  }
  async getPositionById(positionId: string) {
    const events = await this.contract.queryFilter(
      this.contract.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )

    const position = events.filter(
      (position) =>
        // @ts-ignore
        position!.args![0].toHexString() == positionId.toHexString(),
    )

    return this.parsePositionWasOpenedEvent(position[0])
  }
  parsePositionWasOpenedEvent(event: any): Omit<IPosition, 'status'> {
    debugger
    const { args } = event
    const spentToken = tokenList.tokens.find(
      (token) => (args[2] as string) === token.address,
    )!
    const obtainedToken = tokenList.tokens.find(
      (token) => (args[3] as string) === token.address,
    )!
    const collateralToken = tokenList.tokens.find(
      (token) => (args[4] as string) === token.address,
    )!
    const toBorrow = args![6] as BigNumber
    const collateralReceived = args![5] as BigNumber
    const leverage = BigNumber.from(1).add(toBorrow.div(collateralReceived))

    const type =
      collateralToken.address === spentToken.address ? 'long' : 'short'
    const amountIn = args![7] as BigNumber

    const openPrice =
      type === 'long'
        ? BigNumber.from(0)
        : // ? toBorrow.add(collateralReceived).div(amountIn)
          // division by zero
          // : amountIn.div(toBorrow)
          BigNumber.from(0)
    const liquidationPriceBase = BigNumber.from(1).div(
      leverage.div(BigNumber.from(2)),
    )
    const liquidationPrice =
      type === 'long'
        ? openPrice.mul(BigNumber.from(1).sub(liquidationPriceBase))
        : openPrice.mul(BigNumber.from(1).add(liquidationPriceBase))
    const createdAt = new Date((args![9] as BigNumber).toNumber())

    return {
      type,
      positionId: (args![0] as BigNumber).toHexString(),
      ownerId: args[1] as string,
      spentToken,
      obtainedToken,
      collateralToken,
      collateralReceived: collateralReceived.toHexString(),
      leverage: leverage.toNumber(),
      liquidationPrice: liquidationPrice.toHexString(),
      toBorrow: toBorrow.toHexString(),
      amountIn: amountIn.toHexString(),
      interestRate: (args![8] as BigNumber).toHexString(),
      createdAt,
      openPrice: openPrice.toHexString(),
    }
  }
  private async getEventPositions(event: ethers.EventFilter) {
    return this.contract.queryFilter(event, '0x1', 'latest')
  }
  async getUserPositions(user: string): Promise<IPosition[]> {
    const allPositions = await this.getEventPositions(
      this.contract.filters.PositionWasOpened(),
    )
    const closedPositions = await this.getEventPositions(
      this.contract.filters.PositionWasClosed(),
    )
    const liquidatedPositions = await this.getEventPositions(
      this.contract.filters.PositionWasLiquidated(),
    )

    const positions = allPositions.map((p) =>
      this.parsePositionWasOpenedEvent(p),
    )
    // .filter((p) => p.ownerId === user)

    const closedAndLiquidatedPositionsIds = [
      ...closedPositions,
      ...liquidatedPositions,
    ].map((p) => p.args![0].toHexString())

    return positions.map<IPosition>((p) => {
      const isClosed = closedAndLiquidatedPositionsIds.includes(p.positionId)
      return {
        ...p,
        status: isClosed ? 'closed' : 'open',
      }
    })
  }
  getDistanceFromLiquidation(position: IPosition, price: number) {
    const liquidationPrice = BigNumber.from(position.liquidationPrice)
    const currenctPrice = BigNumber.from(price)
    const base = liquidationPrice.div(currenctPrice)
    if (position.type === 'long') {
      return BigNumber.from(1).sub(base)
    } else {
      return base.sub(BigNumber.from(1))
    }
  }
}

// async computeProfitsAndLosses(
//   positionEvent: IParsedPositionWasOpenedEvent,
// ): Promise<[number, number] | undefined> {
//   try {
//     const {
//       amountIn,
//       interestRate,
//       toBorrow,
//       collateralReceived,
//       collateralToken,
//       spentToken,
//       obtainedToken,
//       createdAt,
//       positionId,
//     } = positionEvent

//     const marginTrading = ContractFactory.getMarginTradingStrategyContract(
//       this.signer,
//     )
//     const positionFees = (await marginTrading.positions(positionId)).fees
//     const currentTime = BigNumber.from(
//       BigNumber.from(new Date().getTime()).div(BigNumber.from(1000)),
//     )
//     const time = currentTime.sub(createdAt)
//     const timeFees = toBorrow
//       .mul(interestRate)
//       .mul(time)
//       .div(BigNumber.from(864000000))

//     const fees = timeFees.add(positionFees)

//     if (this.getPositionType(positionEvent) === 'long') {
//       profitsAndLosses = amountIn
//         .sub(
//           (
//             await marginTrading.quote(
//               spentToken,
//               obtainedToken,
//               toBorrow.add(fees),
//             )
//           )[0],
//         )
//         .sub(collateralReceived)
//     } else {
//       profitsAndLosses = (
//         await marginTrading.quote(spentToken, obtainedToken, amountIn)
//       )[0]
//         .sub(toBorrow)
//         .sub(collateralReceived)
//         .sub(fees)
//     }

//     // TODO: percentage is maybe wrong, double check it
//     return [
//       Number(
//         Ether.formatUnits(profitsAndLosses!.toString(), collateralToken),
//       ),
//       Number(
//         profitsAndLosses!.div(collateralReceived).mul(BigNumber.from(100)),
//       ),
//     ]
//   } catch (error) {
//     console.log(error)
//   }
// }

//     //     const profitsAndLosses = await etherGlobal.computeProfitsAndLosses(e)
//     //     calculatedActivePositions.push({
//     //       profit: {
//     //         currencyValue: profitsAndLosses![0],
//     //         percentageValue: profitsAndLosses![1],
//     //       },

// async getPositionCurrentPrice(
//   position: IParsedPositionWasOpenedEvent,
// ): Promise<BigNumber | undefined> {
//   try {
//     const { spentToken, obtainedToken, amountIn, toBorrow, collateralToken } =
//       position

//     const marginTradingStrategy =
//       ContractFactory.getMarginTradingStrategyContract(this.signer)

//     if (collateralToken === spentToken) {
//       console.log(
//         'Current price: ',
//         (
//           await marginTradingStrategy.quote(
//             obtainedToken,
//             spentToken,
//             amountIn,
//           )
//         )[0]
//           .div(amountIn)
//           .toString(),
//       )
//       return (
//         await marginTradingStrategy.quote(obtainedToken, spentToken, amountIn)
//       )[0].div(amountIn)
//     } else {
//       console.log(
//         'Current price: ',
//         (
//           await marginTradingStrategy.quote(
//             spentToken,
//             obtainedToken,
//             toBorrow,
//           )
//         )[0]
//           .div(toBorrow)
//           .toString(),
//       )
//       return (
//         await marginTradingStrategy.quote(spentToken, obtainedToken, toBorrow)
//       )[0].div(toBorrow)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
