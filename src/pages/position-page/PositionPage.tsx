import 'twin.macro'

import { LeveragedPositionPage } from './LeveragedPositionPage'
import { MarginPositionPage } from './MarginPositionPage'
import { StrategyIdentifier } from '../../api/base-strategy'
import { useParams } from 'react-router-dom'

export const PositionPage = () => {
  const { strategy } = useParams<{ strategy: StrategyIdentifier }>()

  console.log(strategy)

  if (strategy === 'margin') {
    return <MarginPositionPage />
  } else return <LeveragedPositionPage />
}
