/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { BasicChart } from './BasicChart'
import { TabButton } from '../TabButton'
import { TokenDetails } from '../../types'
import { TradingChart } from './TradingChart'
import { Txt } from '../Txt'
import { useState } from 'react'

export interface IChartCardProps {
  firstToken: TokenDetails
  secondToken: TokenDetails
  disableTrading?: boolean
}
export const ChartCard = (props: IChartCardProps) => {
  const { firstToken: obtainedToken, secondToken: spentToken } = props
  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')
  return (
    <div tw='w-full height[500px] tablet:height[500px] desktop:height[700px] desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'>
      <div tw='w-full flex flex-row justify-between pb-5 '>
        <Txt.Heading2>{`${obtainedToken.symbol}/${spentToken.symbol}`}</Txt.Heading2>
        {!props.disableTrading && (
          <div tw='hidden desktop:flex flex-row items-center gap-1'>
            <Txt.Body2Regular tw='mr-4'>View:</Txt.Body2Regular>
            <TabButton
              text='Basic'
              active={activeChart === 'basic'}
              onClick={() => setActiveChart('basic')}
            />

            <TabButton
              text='Trading'
              active={activeChart === 'trading'}
              onClick={() => setActiveChart('trading')}
            />
          </div>
        )}
      </div>
      <div tw='w-full h-full  flex flex-col'>
        {activeChart === 'basic' ? (
          <BasicChart
            tokenSymbol={`${obtainedToken.symbol}${spentToken.symbol}`}
          />
        ) : (
          <TradingChart
            tokenSymbol={`${obtainedToken.symbol}${spentToken.symbol}`}
          />
        )}
      </div>
    </div>
  )
}
