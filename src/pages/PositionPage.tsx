/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { BasicChart } from '../shared/BasicChart'
import { CollateralCard } from '../shared/CollateralCard'
import { ContentContainer } from '../shared/ContentContainer'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { Txt } from '../shared/Txt'
import { isDesktop } from '../utils'
import { Chart } from '../shared/Chart'

const SomeText = (props: { value: string | number }) => {
  return isDesktop ? (
    <Txt.CaptionMedium tw='text-font-100'>{props.value}</Txt.CaptionMedium>
  ) : (
    <Txt.Body1Regular tw='text-font-100'>{props.value}</Txt.Body1Regular>
  )
}

const TabButton = (props: {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
  className?: string | undefined
}) => {
  return (
    <button
      css={[
        tw`bg-primary-300 border-0 rounded-md cursor-pointer flex flex-row items-center px-8 py-2.5`,
        props.active && tw`bg-action`,
      ]}
      onClick={props.onClick}
    >
      <Txt.Body2Regular
        css={[tw`text-secondary`, props.active && tw`text-primary-100`]}
      >
        {props.text}
      </Txt.Body2Regular>
    </button>
  )
}

export const PositionPage = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const [chartDimensions, setChartDimensions] = useState([0, 0])
  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')

  useEffect(() => {
    setChartDimensions([
      divRef.current?.offsetWidth as number,
      divRef.current?.offsetHeight as number,
    ])
  }, [divRef.current])

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>ETH/ETH</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              <PositionDetailsCard />
              <CollateralCard />
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
                <Txt.Body2Regular>
                  Placeholder-Liquidation price
                </Txt.Body2Regular>
              </div>
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
                <Txt.Body2Regular>Placeholder-Position value</Txt.Body2Regular>
              </div>
            </div>
            <div
              ref={divRef}
              tw='w-full desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'
            >
              <div tw='w-full h-14 flex flex-col gap-2 justify-center items-center'>
                <div tw='w-full flex flex-row justify-between pb-5 '>
                  <Txt.Heading2>ETH/USDC</Txt.Heading2>
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
                </div>
                {/* <div tw='w-full flex flex-row justify-start'>
                  <SomeText value='0.124348' />
                </div> */}
                {/* <div tw='w-full flex flex-row justify-between'>
                  <Txt.Body2Regular>
                    +0.00032 (0.17%) – Jan 24, 2022, 10:00 AM
                  </Txt.Body2Regular>
                  {isDesktop && (
                    <div tw='flex gap-4'>
                      <Txt.CaptionMedium>Low: 0.00023</Txt.CaptionMedium>
                      <Txt.CaptionMedium>High: 1.2331</Txt.CaptionMedium>
                    </div>
                  )}
                </div> */}
              </div>
              <div id='chart'></div>
              {divRef.current && (
                <BasicChart
                  type={activeChart}
                  width={chartDimensions[0]}
                  containerId='chart'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
