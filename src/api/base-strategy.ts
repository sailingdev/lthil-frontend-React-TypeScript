import { Contract, ethers } from 'ethers'

export type SupportedEventFilters = 'open' | 'closed' | 'liquidated'
export type StrategyIdentifier = 'margin' | 'leveraged'

export abstract class BaseStrategy {
  public signer!: ethers.providers.JsonRpcSigner
  public contract!: Contract

  getOpenFilter(): ethers.EventFilter {
    return this.contract.filters.PositionWasOpened()
  }
  getClosedFilter(): ethers.EventFilter {
    return this.contract.filters.PositionWasClosed()
  }
  getLiquidatedFilter(): ethers.EventFilter {
    return this.contract.filters.PositionWasLiquidated()
  }
  abstract openPosition(positionData: any): Promise<any>
  abstract getStrategyIdentifier(): StrategyIdentifier
}
