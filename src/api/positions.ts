import {
  BaseStrategy,
  StrategyIdentifier,
  SupportedEventFilters,
} from './base-strategy'
import { BigNumber, FixedNumber, ethers } from 'ethers'

import { Ether } from './ether'
import { IPosition } from '../types'
import { MarginTrading } from './margin-trading'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'

export class PositionAggregate {
  public strategies: BaseStrategy[] = []

  constructor(signer: ethers.providers.JsonRpcSigner) {
    this.strategies = [new MarginTrading(signer)]
  }

  public getStrategy(id: StrategyIdentifier) {
    return this.strategies.find((s) => s.getStrategyIdentifier() === id)!
  }
  public getMarginStrategy() {
    return this.getStrategy('margin') as MarginTrading
  }
  parsePosition(
    event: ethers.Event,
    identifier: StrategyIdentifier,
  ): Omit<IPosition, 'status'> {
    const args = event.args!
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
      strategy: identifier,
      positionId: (args![0] as BigNumber).toString(),
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

  private getFilter(s: BaseStrategy, str: SupportedEventFilters) {
    return {
      open: s.getOpenFilter(),
      closed: s.getClosedFilter(),
      liquidated: s.getLiquidatedFilter(),
    }[str]
  }
  private async getEventPositions(filter: SupportedEventFilters) {
    let allEvents: Array<{
      event: ethers.Event
      identifier: StrategyIdentifier
    }> = []
    for (const s of this.strategies) {
      const identifier = s.getStrategyIdentifier()
      const events = await s.contract.queryFilter(
        this.getFilter(s, filter),
        '0x1',
        'latest',
      )
      const strategyEvents = events.map((e) => ({
        event: e,
        identifier,
      }))
      allEvents = [...allEvents, ...strategyEvents]
    }
    return allEvents
  }
  async getUserPositions(user: string): Promise<IPosition[]> {
    const allPositions = await this.getEventPositions('open')
    const closedPositions = await this.getEventPositions('closed')
    const liquidatedPositions = await this.getEventPositions('liquidated')

    const positions = allPositions
      .map((p) => this.parsePosition(p.event, p.identifier))
      .filter((p) => p.ownerId === user)

    const closedAndLiquidatedPositionsIds = [
      ...closedPositions,
      ...liquidatedPositions,
    ].map((p) => p.event.args![0].toString())

    return positions.map<IPosition>((p) => {
      const isClosed = closedAndLiquidatedPositionsIds.includes(p.positionId)
      return {
        ...p,
        status: isClosed ? 'closed' : 'open',
      }
    })
  }
}
