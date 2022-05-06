import { BigNumber, Contract, FixedNumber, Transaction, ethers } from 'ethers'
import { IInputPosition, IPosition } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'
import { Utils } from './utils'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'

export class MarginTrading {
  private signer!: ethers.providers.JsonRpcSigner
  private contract!: Contract

  constructor(signer: ethers.providers.JsonRpcSigner) {
    this.signer = signer
    this.contract = ContractFactory.getMarginTradingStrategyContract(
      this.signer,
    )
  }

  async getMaxLeverage(): Promise<FixedNumber> {
    return FixedNumber.from('5')
  }

  async computeMaxAndMin({
    positionType,
    priority,
    ...positionData
  }: IInputPosition): Promise<any> {
    const margin = FixedNumber.from(positionData.margin)
    const leverage = FixedNumber.from(positionData.leverage.toString())
    const slippage = FixedNumber.from(positionData.slippage)
    const base = FixedNumber.from('1').subUnsafe(
      slippage.divUnsafe(FixedNumber.from('100')),
    )

    const [minQ] = await this.contract.quote(
      positionData.spentToken,
      positionData.obtainedToken,
      margin.mulUnsafe(leverage).toHexString(),
    )
    const minObtainedQuote = FixedNumber.from(
      Ether.utils.formatTokenUnits(minQ, positionData.spentToken),
    )

    const [maxQ] = await this.contract.quote(
      positionData.obtainedToken,
      positionData.spentToken,
      margin.mulUnsafe(leverage).toHexString(),
    )
    const maxSpentQuote = FixedNumber.from(
      Ether.utils.formatTokenUnits(maxQ, positionData.spentToken),
    )

    if (positionType === 'long') {
      if (priority === 'buy') {
        return [margin.mulUnsafe(leverage).divUnsafe(base), minObtainedQuote]
      } else {
        return [margin.mulUnsafe(leverage), minObtainedQuote.mulUnsafe(base)]
      }
    } else {
      if (priority === 'buy') {
        return [maxSpentQuote.divUnsafe(base), margin.mulUnsafe(leverage)]
      } else {
        return [maxSpentQuote, margin.mulUnsafe(leverage).mulUnsafe(base)]
      }
    }
  }
  async closePosition(positionId: string): Promise<Transaction> {
    try {
      return this.contract.closePosition(positionId, {
        gasLimit: 10000000,
      })
    } catch (error) {
      console.error(error)
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
          deadline: BigNumber.from(
            Math.floor(Date.now() / 1000) + 60 * deadline,
          ).toHexString(),
          collateral: marginValue.toHexString(),
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
      console.error(error)
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
    const spentToken = tokens.find(
      (token) => (args[2] as string) === token.address,
    )!
    const obtainedToken = tokens.find(
      (token) => (args[3] as string) === token.address,
    )!
    const collateralToken = tokens.find(
      (token) => (args[4] as string) === token.address,
    )!

    const toBorrow = FixedNumber.from(
      Ether.utils.formatTokenUnits(
        args![6] as BigNumber,
        collateralToken.address,
      ),
    )
    const collateralReceived = FixedNumber.from(
      Ether.utils.formatTokenUnits(
        args![5] as BigNumber,
        collateralToken.address,
      ),
    )
    const amountIn = FixedNumber.from(
      Ether.utils.formatTokenUnits(
        args![7] as BigNumber,
        collateralToken.address,
      ),
    )
    const interestRate = FixedNumber.from(
      Ether.utils.formatTokenUnits(
        args![9] as BigNumber,
        collateralToken.address,
      ),
    )

    const leverage = FixedNumber.from('1').addUnsafe(
      toBorrow.divUnsafe(collateralReceived),
    )

    const type =
      collateralToken.address === spentToken.address ? 'long' : 'short'

    const liquidationPriceBase = FixedNumber.from('1').divUnsafe(
      leverage.mulUnsafe(FixedNumber.from('0.5')),
    )

    const openPrice =
      type === 'long'
        ? amountIn.isZero()
          ? Ether.utils.zero
          : toBorrow.addUnsafe(collateralReceived).divUnsafe(amountIn)
        : toBorrow.isZero()
        ? Ether.utils.zero
        : amountIn.divUnsafe(toBorrow)
    const liquidationPrice =
      type === 'long'
        ? openPrice.mulUnsafe(
            FixedNumber.from('1').subUnsafe(liquidationPriceBase),
          )
        : openPrice.mulUnsafe(
            FixedNumber.from('1').addUnsafe(liquidationPriceBase),
          )

    return {
      type,
      positionId: (args![0] as BigNumber).toHexString(),
      ownerId: args[1] as string,
      spentToken,
      obtainedToken,
      collateralToken,
      collateralReceived: collateralReceived.toString(),
      leverage: leverage.toString(),
      liquidationPrice: liquidationPrice.toString(),
      toBorrow: toBorrow.toString(),
      amountIn: amountIn.toString(),
      interestRate: interestRate.toString(),
      createdAt: (args![9] as BigNumber).toNumber(),
      openPrice: openPrice.toString(),
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

    const positions = allPositions
      .map((p) => this.parsePosition(p))
      .filter((p) => p.ownerId === user)

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
    const currentPrice = BigNumber.from(price)
    const base = liquidationPrice.div(currentPrice)
    if (position.type === 'long') {
      return BigNumber.from(1).sub(base)
    } else {
      return base.sub(BigNumber.from(1))
    }
  }

  async computePositionProfit(
    position: IPosition,
  ): Promise<[FixedNumber, FixedNumber] | undefined> {
    const { fees } = await this.contract.positions(position.positionId)
    const positionFee = FixedNumber.from(
      Ether.utils.formatTokenUnits(fees, position.spentToken.address),
    )
    const currentTime = FixedNumber.from(
      (new Date().getTime() / 1000).toString(),
    )
    const time = currentTime.subUnsafe(
      FixedNumber.from(position.createdAt.toString()),
    )

    const timeFees = FixedNumber.from(position.toBorrow)
      .mulUnsafe(FixedNumber.from(position.interestRate))
      .mulUnsafe(time)
      .divUnsafe(FixedNumber.from(864000000))

    const totalFees = timeFees.addUnsafe(positionFee)
    const amount = (
      await this.contract.quote(
        position.spentToken.address,
        position.obtainedToken.address,
        position.type === 'long'
          ? FixedNumber.from(position.toBorrow)
              .addUnsafe(totalFees)
              .toHexString()
          : FixedNumber.from(position.amountIn).toHexString(),
      )
    )[0]
    const quoteAmount = FixedNumber.from(
      Ether.utils.formatTokenUnits(amount, position.spentToken.address),
    )

    const profit =
      position.type === 'long'
        ? FixedNumber.from(position.amountIn)
            .subUnsafe(quoteAmount)
            .subUnsafe(FixedNumber.from(position.collateralReceived))
        : quoteAmount.subUnsafe(
            FixedNumber.from(position.toBorrow)
              .subUnsafe(FixedNumber.from(position.collateralReceived))
              .subUnsafe(totalFees),
          )

    return [
      profit,
      profit.divUnsafe(
        FixedNumber.from(position.collateralReceived).mulUnsafe(
          FixedNumber.from('100'),
        ),
      ),
    ]
  }

  async getPositionCurrentPrice(
    position: IPosition,
  ): Promise<BigNumber | undefined> {
    try {
      const { spentToken, obtainedToken, amountIn, toBorrow, collateralToken } =
        position

      if (position.type === 'long') {
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
      console.error(error)
    }
  }

  async editPosition(
    positionId: string,
    newCollateral: string,
    collateralToken: string,
  ): Promise<any> {
    try {
      const editPosition = this.contract.editPosition(
        positionId,
        Utils.parseTokenUnits(newCollateral, collateralToken),
        {
          gasLimit: 10000000,
        },
      )

      return editPosition
    } catch (error) {
      console.error(error)
    }
  }
}
