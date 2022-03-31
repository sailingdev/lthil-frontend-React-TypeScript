import { BigNumber, Contract, ethers } from 'ethers'
import { IOpenPosition, PositionType, Priority } from '../types'

import { ContractFactory } from './contract-factory'
import { Ether } from './ether'

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
  }: IOpenPosition): // @ts-ignore
  Promise<[BigNumber, BigNumber]> {
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
      }
      if (priority === 'sell') {
        return [margin.mul(leverage), minObtainedQuote.mul(base)]
      }
    }
    if (positionType === 'short') {
      if (priority === 'buy') {
        return [maxSpentQuote.div(base), margin.mul(leverage)]
      }
      if (priority === 'sell') {
        return [maxSpentQuote, margin.mul(leverage).mul(base)]
      }
    }
  }

  async openPosition(positionData: IOpenPosition): Promise<any> {
    const {
      spentToken,
      obtainedToken,
      leverage,
      slippage,
      deadline,
      margin,
      positionType,
      priority,
    } = positionData

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
}
