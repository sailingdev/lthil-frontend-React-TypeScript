/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { useState } from 'react'
import { Question } from 'phosphor-react'
import GaugeChart from 'react-gauge-chart'

import { Button } from './Button'
import { InputField } from '../shared/InputField'
import { SliderBar } from './SliderBar'
import { Txt } from './Txt'
import { isDesktop } from '../utils'
import { IPosition } from '../types'

const Text = (props: { value: string | number; bold?: boolean }) => {
  return isDesktop ? (
    <Txt.Body2Regular css={[props.bold && tw`font-bold`]}>
      {props.value}
    </Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular css={[props.bold && tw`font-bold`]}>
      {props.value}
    </Txt.Body1Regular>
  )
}

interface ILiquidation {
  onClick: () => void
  inputOnChange: (value: string) => void
  inputValue: string
  position: IPosition
}

export const TopUp = (props: ILiquidation) => {
  const [sliderValue, setSliderValue] = useState(100)
  const [inputTextValue, setInputTextValue] = useState(100)
  const [inputGuageValue] = useState(1)

  const onSliderChange = (value: number) => {
    setSliderValue(value)
    const topUpAmount =
      parseInt(props.position.collateralReceived) * (value / 100)
    setInputTextValue(topUpAmount)
  }

  const { onClick, inputOnChange } = props

  return (
    <>
      <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
        <GaugeChart
          id='gauge-chart3'
          nrOfLevels={30}
          arcWidth={0.3}
          percent={inputGuageValue}
          needleColor='#070B07'
          needleBaseColor='#070B07'
        />
        <div tw='w-full flex flex-row justify-between'>
          <div tw='flex flex-row items-center'>
            <Text value='Collateral' />
            <Question
              tw='text-font-100 dark:text-font-200 height[16px] width[16px] ml-1'
              size={32}
            />
          </div>
          <Text bold value={`${sliderValue}%`} />
        </div>
        <SliderBar
          tw='my-2'
          min={0}
          max={150}
          step={10}
          value={sliderValue}
          onChange={onSliderChange}
        />
        <div tw='my-6 w-full gap-2 flex flex-col'>
          <InputField
            renderRight={
              <Txt.InputText tw='text-font-100'>
                {props.position.collateralToken.symbol}
              </Txt.InputText>
            }
            label='Top up'
            placeholder='0'
            value={inputTextValue.toString()}
            onChange={(value) => inputOnChange(value)}
          />
          <Button text='Top up' action full bold onClick={onClick} />
        </div>
        {/* TODO: Placeholder */}
      </div>
    </>
  )
}
