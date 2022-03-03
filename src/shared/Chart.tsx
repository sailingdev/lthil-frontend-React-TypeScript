import { Txt } from '../shared/Txt'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { BasicChart } from '../shared/BasicChart'

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

export const Chart = (props: { containerId: string }) => {
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
    <div
      ref={divRef}
      tw='w-full h-14 flex flex-col gap-2 justify-center items-center'
    >
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
      {/* <div id='chart'></div> */}
      {divRef.current && (
        <BasicChart
          type={activeChart}
          width={chartDimensions[0]}
          containerId={props.containerId}
        />
      )}
    </div>
    // {/* <div tw='w-full flex flex-row justify-start'>
    // <SomeText value='0.124348' />
    // </div> */}
    // {/* <div tw='w-full flex flex-row justify-between'>
    // <Txt.Body2Regular>
    // +0.00032 (0.17%) – Jan 24, 2022, 10:00 AM
    // </Txt.Body2Regular>
    // {isDesktop && (
    // <div tw='flex gap-4'>
    // <Txt.CaptionMedium>Low: 0.00023</Txt.CaptionMedium>
    // <Txt.CaptionMedium>High: 1.2331</Txt.CaptionMedium>
    // </div>
    // )}
    // </div> */}
  )
}
