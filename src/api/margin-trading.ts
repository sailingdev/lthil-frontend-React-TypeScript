import { BigNumber, Contract, Transaction, ethers } from 'ethers'
import { IInputPosition, IPosition } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'
import tokenList from './../assets/tokenlist.json'

export class MarginTrading {
  private signer!: ethers.providers.JsonRpcSigner
  private contract!: Contract

  constructor(signer: ethers.providers.JsonRpcSigner) {
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
    const margin = Ether.utils.parseTokenUnits(
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

    const marginValue = Ether.utils.parseTokenUnits(
      margin.toString(),
      spentToken,
    )

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

    return this.parsePosition(position[0])
  }
  parsePosition(event: any): Omit<IPosition, 'status'> {
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
    const toBorrow = Ether.utils.parseUnits(args![6] as BigNumber)
    const collateralReceived = Ether.utils.parseUnits(args![5] as BigNumber)
    const amountIn = Ether.utils.parseUnits(args![7] as BigNumber)

    const leverage = Ether.utils
      .parseUnits(1)
      .add(toBorrow.div(collateralReceived))

    const type =
      collateralToken.address === spentToken.address ? 'long' : 'short'

    const liquidationPriceBase = Ether.utils
      .parseUnits(1)
      .div(leverage.mul(Ether.utils.parseUnits(0.5)))

    const openPrice =
      type === 'long'
        ? amountIn.isZero()
          ? Ether.utils.zero
          : toBorrow.add(collateralReceived).div(amountIn)
        : toBorrow.isZero()
        ? Ether.utils.zero
        : amountIn.div(toBorrow)
    const liquidationPrice =
      type === 'long'
        ? openPrice.mul(Ether.utils.parseUnits(1).sub(liquidationPriceBase))
        : openPrice.mul(Ether.utils.parseUnits(1).add(liquidationPriceBase))

    console.log('liqudationPrice:', liquidationPrice)
    console.log('leverage:', Ether.utils.formatUnits(leverage))
    console.log('openPrice:', Ether.utils.formatUnits(openPrice))

    console.log(
      'liquidationPriceBase: ',
      Ether.utils.formatUnits(liquidationPriceBase),
    )

    return {
      type,
      positionId: (args![0] as BigNumber).toHexString(),
      ownerId: args[1] as string,
      spentToken,
      obtainedToken,
      collateralToken,
      collateralReceived: Ether.utils.formatUnits(collateralReceived),
      leverage: Ether.utils.formatUnits(leverage),
      liquidationPrice: Ether.utils.formatUnits(liquidationPrice),
      toBorrow: Ether.utils.formatUnits(toBorrow),
      amountIn: Ether.utils.formatUnits(amountIn),
      interestRate: Ether.utils.formatUnits(
        Ether.utils.parseUnits(args![8] as BigNumber),
      ),
      createdAt: (args![9] as BigNumber).toNumber(),
      openPrice: Ether.utils.formatUnits(openPrice),
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

    const positions = allPositions.map((p) => this.parsePosition(p))
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

  async computeProfitsAndLosses(
    position: IPosition,
  ): Promise<[number, number] | undefined> {
    const { fees: positionFee } = await this.contract.positions(
      position.positionId,
    )
    const currentTime = BigNumber.from(
      BigNumber.from(new Date().getTime()).div(BigNumber.from(1000)),
    )
    const time = currentTime.sub(BigNumber.from(position.createdAt))
    const timeFees = BigNumber.from(position.toBorrow)
      .mul(BigNumber.from(position.interestRate))
      .mul(time)
      .div(BigNumber.from(864000000))

    const fees = timeFees.add(positionFee)
    const quoteAmount = (
      await this.contract.quote(
        position.spentToken.address,
        position.obtainedToken.address,
        position.type === 'long'
          ? BigNumber.from(position.toBorrow).add(fees)
          : BigNumber.from(position.amountIn),
      )
    )[0]

    const profit =
      position.type === 'long'
        ? BigNumber.from(position.amountIn)
            .sub(quoteAmount)
            .sub(BigNumber.from(position.collateralReceived))
        : quoteAmount.sub(
            BigNumber.from(position.toBorrow)
              .sub(BigNumber.from(position.collateralReceived))
              .sub(fees),
          )

    return [
      Number(
        Ether.utils.formatTokenUnits(
          profit.toString(),
          position.collateralToken.address,
        ),
      ),
      Number(
        profit
          .div(BigNumber.from(position.collateralReceived))
          .mul(BigNumber.from(100)),
      ),
    ]
  }

  async getPositionCurrentPrice(
    position: IPosition,
  ): Promise<BigNumber | undefined> {
    try {
      const { spentToken, obtainedToken, amountIn, toBorrow, collateralToken } =
        position

      // strange condition
      if (collateralToken === spentToken) {
        const quoteAmount = (
          await this.contract.quote(
            position.obtainedToken.address,
            position.spentToken.address,
            BigNumber.from(position.amountIn),
          )
        )[0]
        return quoteAmount.div(amountIn)
      } else {
        const quoteAmount = (
          await this.contract.quote(
            position.spentToken.address,
            position.obtainedToken.address,
            BigNumber.from(position.toBorrow),
          )
        )[0]
        return quoteAmount.div(toBorrow)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
