import { useParams } from 'react-router-dom'

import { LeveragedPositionPage } from './LeveragedPositionPage'
import { MarginPositionPage } from './MarginPositionPage'
import { StrategyIdentifier } from '../../api/base-strategy'

export const PositionPage = () => {
  const { strategy } = useParams<{ strategy: StrategyIdentifier }>()

  console.log(strategy)

  if (strategy === 'margin') {
    return <MarginPositionPage />
  } else return <LeveragedPositionPage />
}
