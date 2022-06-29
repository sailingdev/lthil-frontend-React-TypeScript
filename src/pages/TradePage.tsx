/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useNavigate } from 'react-router-dom'

import { ContentContainer } from '../shared/ContentContainer'
import { Strategy } from '../shared/Strategy'
import { Txt } from '../shared/Txt'
const strategies = [
  {
    id: 1,
    title: 'Margin trading',
    description: 'Go long or short on any token pair',
    apyMin: '0',
    apyMax: '∞x',
    risk: 'High',
    url: '/trade/margin-trading',
  },
  {
    id: 2,
    title: 'Leveraged staking',
    description: 'Stake your favorite token and earn wealth',
    apyMin: '0',
    apyMax: '10x',
    risk: 'Low',
    url: '/trade/leveraged-trading',
  },
]

export const TradePage = () => {
  const navigate = useNavigate()

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Trading strategies</Txt.Heading1>

          <div tw='flex flex-row gap-x-4 flex-wrap gap-y-4 justify-center'>
            {strategies.map((s) => (
              <Strategy
                key={s.id}
                {...s}
                onClick={() => s.url && navigate(s.url)}
              />
            ))}
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
