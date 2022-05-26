import { BaseStrategy, StrategyIdentifier } from './base-strategy'
import { BigNumber, FixedNumber, Transaction, ethers } from 'ethers'
import { IInputPosition, IPosition } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'
import { Utils } from './utils'

export class MarginTrading extends BaseStrategy {
  constructor(signer: ethers.providers.JsonRpcSigner) {
    super()
    this.signer = signer
    this.contract = ContractFactory.getMarginTradingStrategyContract(
      this.signer,
    )
  }

  getStrategyIdentifier(): StrategyIdentifier {
    return 'margin'
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
      margin.mulUnsafe(leverage),
    )
    const minObtainedQuote = FixedNumber.from(
      Ether.utils.formatTokenUnits(minQ, positionData.spentToken),
    )

    const [maxQ] = await this.contract.quote(
      positionData.obtainedToken,
      positionData.spentToken,
      margin.mulUnsafe(leverage),
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
  async closePosition(position: IPosition): Promise<Transaction> {
    try {
      const p = await this.contract.positions(position.positionId)
      const fees = p.fees as BigNumber
      const allowance = p.allowance as BigNumber
      const principal = p.principal as BigNumber
      const maxOrMin =
        position.collateralToken.name != position.spentToken.name
          ? principal.add(fees)
          : allowance

      return this.contract.closePosition(position.positionId, maxOrMin)
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
          ),
          collateral: marginValue,
          collateralIsSpentToken: positionType === 'long' ? true : false,
          minObtained: minObtained,
          maxSpent: maxSpent,
        },
        {
          gasLimit: 10000000,
        },
      )
      return position
    } catch (error) {
      console.error(error)
      return error
    }
  }
  //   getDistanceFromLiquidation(position: IPosition, price: number) {
  //     const liquidationPrice = BigNumber.from(position.liquidationPrice)
  //     const currentPrice = BigNumber.from(price)
  //     const base = liquidationPrice.div(currentPrice)
  //     if (position.type === 'long') {
  //       return BigNumber.from(1).sub(base)
  //     } else {
  //       return base.sub(BigNumber.from(1))
  //     }
  //   }

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
          ? FixedNumber.from(position.toBorrow).addUnsafe(totalFees)
          : FixedNumber.from(position.amountIn),
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

    // console.log('Amount in:', position.amountIn)
    // console.log('To borrow:', position.toBorrow)
    // console.log('Collateral received:', position.collateralReceived)

    return [
      profit,
      profit.divUnsafe(
        FixedNumber.from(position.collateralReceived).mulUnsafe(
          FixedNumber.from('100'),
        ),
      ),
    ]
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
