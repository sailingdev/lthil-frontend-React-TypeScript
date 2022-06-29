import { BaseStrategy, StrategyIdentifier } from './base-strategy'
import { BigNumber, FixedNumber, ethers } from 'ethers'
import { IPosition, LeveragedInputPosition, Transaction } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'
import { Utils } from './utils'

export class LeveragedTrading extends BaseStrategy {
  constructor(signer: ethers.providers.JsonRpcSigner) {
    super()
    this.signer = signer
    this.contract = ContractFactory.getYearnStrategyContract(this.signer)
  }

  getStrategyIdentifier(): StrategyIdentifier {
    return 'leveraged'
  }

  async getMaxLeverage(): Promise<FixedNumber> {
    return FixedNumber.from('5')
  }

  async computeMaxSpent(positionData: LeveragedInputPosition): Promise<any> {
    const margin = FixedNumber.from(positionData.margin)
    const leverage = FixedNumber.from(positionData.leverage.toString())
    const slippage = FixedNumber.from(positionData.slippage)
    const base = FixedNumber.from('1').subUnsafe(
      slippage.divUnsafe(FixedNumber.from('100')),
    )
    return margin.mulUnsafe(leverage).divUnsafe(base)
  }
  async closePosition(position: IPosition): Promise<Transaction> {
    try {
      return this.contract.closePosition(position.positionId)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async openPosition(positionData: LeveragedInputPosition): Promise<any> {
    const { deadline, margin } = positionData

    const marginValue = Ether.utils.parseTokenUnits(
      margin.toString(),
      positionData.token,
    )
    const maxSpent = await this.computeMaxSpent(positionData)
    try {
      const data = {
        deadline: BigNumber.from(Math.floor(Date.now() / 1000) + 60 * deadline),
        collateral: marginValue,
        spentToken: positionData.token,
        obtainedToken: positionData.token,
        collateralIsSpentToken: true,
        minObtained: maxSpent,
        maxSpent,
      }
      const position = await this.contract.openPosition(data, {
        gasLimit: 10000000,
      })

      return position
    } catch (error) {
      console.error(error)
      return error
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
