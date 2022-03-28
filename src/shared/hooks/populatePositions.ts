import { IParsedPositionWasOpenedEvent } from '../../types'
import { IPositionRow } from '../../types'
import tokenList from '../../assets/tokenlist.json'
import { useAsync } from 'react-use'
import { usePositions } from '../../state/hooks'
import { useState } from 'react'

export const populatePositions = () => {
  const [positions, setPositions] = useState<IPositionRow[]>([])
  const events = usePositions() ?? []
  useAsync(async () => {
    try {
      const calculatedPositions = events.map(
        (e: IParsedPositionWasOpenedEvent) => {
          const spentToken = tokenList.tokens.find(
            (token) => e.spentToken === token.address,
          )?.symbol
          const obtainedToken = tokenList.tokens.find(
            (token) => e.obtainedToken === token.address,
          )?.symbol
          return {
            tokenPair: `${spentToken}/${obtainedToken}`,
            position: `${spentToken}/${obtainedToken}`,
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
