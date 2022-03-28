import {
  IParsedPositionWasOpenedEvent,
  IPositionWasOpenedEvent,
  PositionRow,
  PositionWasOpenedEvent,
} from '../../types'

import { ContractFactory } from '../../api/contract-factory'
import { etherGlobal } from '../../api/ether'
import tokenList from '../../assets/tokenlist.json'
import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { usePosition } from '../../state/hooks'
import { IPositionRow } from '../../types'

export const usePositions = () => {
  const [positions, setPositions] = useState<IPositionRow[]>([])
  const events = usePosition() ?? []
  useAsync(async () => {
    try {
      const calculatedPositions = events.map(
        (e: IParsedPositionWasOpenedEvent) => {
          const owedToken = tokenList.tokens.find(
            (token) => e.owedToken === token.address,
          )?.symbol
          const heldToken = tokenList.tokens.find(
            (token) => e.heldToken === token.address,
          )?.symbol
          return {
            tokenPair: `${owedToken}/${heldToken}`,
            position: `${owedToken}/${heldToken}`,
            profit: {
              currencyValue: 2,
              percentageValue: 15,
            },
            trend: 'placeholder',
            positionId: e.positionId,
          } as IPositionRow
        },
      )
      setPositions(calculatedPositions)
    } catch (error) {
      console.log(error)
    }
  }, [events])
  return positions
}
