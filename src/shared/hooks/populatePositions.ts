import { IParsedPositionWasOpenedEvent, ProfitsAndLosses } from '../../types'
import { IPositionRow } from '../../types'
import tokenList from '../../assets/tokenlist.json'
import { useAsync } from 'react-use'
import {
  useActivePositions,
  useClosedAndLiquidatedPositions,
} from '../../state/hooks'
import { useState } from 'react'
import { etherGlobal } from '../../api/ether'

export const populatePositions = () => {
  const [activePositions, setActivePositions] = useState<IPositionRow[]>([])
  const [closedAndLiquidatedPositions, setClosedAndLiquidatedPositions] =
    useState<IPositionRow[]>([])
  const activeEvents = useActivePositions() ?? []
  const closedAndLiquidatedEvents = useClosedAndLiquidatedPositions() ?? []

  const calculatedActivePositions: IPositionRow[] = []
  const calculatedClosedAndLiquidatedPositions: IPositionRow[] = []

  useAsync(async () => {
    try {
      for (const e of activeEvents) {
        const spentToken = tokenList.tokens.find(
          (token) => e.spentToken === token.address,
        )?.symbol
        const obtainedToken = tokenList.tokens.find(
          (token) => e.obtainedToken === token.address,
        )?.symbol
        const profitsAndLosses = await etherGlobal.computeProfitsAndLosses(e)
        calculatedActivePositions.push({
          tokenPair: `${spentToken}/${obtainedToken}`,
          position: etherGlobal.getPositionShortDescription(e),
          profit: {
            currencyValue: profitsAndLosses![0],
            percentageValue: profitsAndLosses![1],
          },
          trend: 'placeholder',
          positionId: e.positionId,
        } as IPositionRow)
      }

      for (const e of closedAndLiquidatedEvents) {
        const spentToken = tokenList.tokens.find(
          (token) => e.spentToken === token.address,
        )?.symbol
        const obtainedToken = tokenList.tokens.find(
          (token) => e.obtainedToken === token.address,
        )?.symbol
        const profitsAndLosses = await etherGlobal.computeProfitsAndLosses(e)
        calculatedClosedAndLiquidatedPositions.push({
          tokenPair: `${spentToken}/${obtainedToken}`,
          position: etherGlobal.getPositionShortDescription(e),
          profit: {
            currencyValue: profitsAndLosses![0],
            percentageValue: profitsAndLosses![1],
          },
          trend: 'placeholder',
          positionId: e.positionId,
        } as IPositionRow)
      }

      setActivePositions(calculatedActivePositions)
      setClosedAndLiquidatedPositions(calculatedClosedAndLiquidatedPositions)
    } catch (error) {
      console.log(error)
    }
  }, [activeEvents, closedAndLiquidatedEvents])
  return { activePositions, closedAndLiquidatedPositions }
}
