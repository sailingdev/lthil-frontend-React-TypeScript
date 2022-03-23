import { PositionRow, PositionWasOpenedEvent } from '../../types'

import { ContractFactory } from '../../api/contract-factory'
import { etherGlobal } from '../../api/ether'
import tokenList from '../../assets/tokenlist.json'
import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'
import { useState } from 'react'

export interface IPositionRow {
  tokenPair: string
  position: string
  profit: {
    currencyValue: number
    percentageValue: number
    format: string
  }
  trend: string
}

export const usePositions = () => {
  const [positions, setPositions] = useState<IPositionRow[]>([])
  const isConnected = useIsConnected()
  useAsync(async () => {
    if (!isConnected) {
      return
    }
    const MarginTradingStrategy =
      ContractFactory.getMarginTradingStrategyContract(
        await etherGlobal.ensureSigner(),
      )
    const openedPositions = await MarginTradingStrategy.queryFilter(
      MarginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )
    console.log(openedPositions)

    const events: PositionWasOpenedEvent[] = [
      {
        id: '1',
        owner: '0x4678820caa137EE5FDcE601E1963a3b487d8F1f4',
        owedToken: '0x52C9CC325f372eF9891eBf8F317ec3b861feC817',
        heldToken: '0x2eEb75C48f56dA757f626C09A95487639a46e517',
        collateralToken: '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
        collateral: '0xde0b6b3a7640000',
        principal: 'hex',
        allowance: 'hex',
        fees: 'hex',
        createdAt: 'hex',
      },
    ]

    const calculatedPositions = events.map((e) => {
      const ownedToken = tokenList.tokens.find(
        (token) => e.owedToken === token.address,
      )?.symbol
      const heldToken = tokenList.tokens.find(
        (token) => e.heldToken === token.address,
      )?.symbol
      return {
        tokenPair: `${ownedToken}/${heldToken}`,
        position: `${ownedToken}/${heldToken}`,
        profit: {
          currencyValue: 2,
          percentageValue: 15,
        },
        trend: 'placeholder',
      } as IPositionRow
    })
    setPositions(calculatedPositions)
  }, [isConnected])
  return positions
}
