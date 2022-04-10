/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useState } from 'react'

import { Txt } from './Txt'
import { isDesktop } from '../utils'
import { SliderBar } from './SliderBar'
import { Question } from 'phosphor-react'
import { Button } from '../shared/Button'
import { InputField } from '../shared/InputField'

import TopUpSectionPlaceholder from '../assets/images/topUpSectionPlaceholder.png'

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
  collateralTokenSymbol: string
}

export const TopUp = (props: ILiquidation) => {
  const [sliderValue, setSliderValue] = useState(100)

  // const onSliderChange = (value: number) => {
  //   setSliderValue(value)
  // }

  const { onClick, inputOnChange, inputValue, collateralTokenSymbol } = props

  return (
    <>
      <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
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
          min={50}
          max={150}
          step={0.1}
          value={sliderValue}
          // onChange={onSliderChange}
        />
        <div tw='w-full flex flex-row justify-between'>
          <Txt.CaptionMedium tw='text-font-100'>Withdraw</Txt.CaptionMedium>
          <Txt.CaptionMedium tw='text-font-100'>Top up</Txt.CaptionMedium>
        </div>
        <div tw='my-6 w-full gap-2 flex flex-col'>
          <InputField
            renderRight={
              <Txt.InputText tw='text-font-100'>
                {props.collateralTokenSymbol}
              </Txt.InputText>
            }
            label='Top up'
            placeholder='0'
            value={inputValue}
            onChange={(value) => inputOnChange(value)}
          />
          <Button text='Top up' action full bold onClick={onClick} />
        </div>
        {/* TODO: Placeholder */}
        <img
          tw='mt-4'
          src={TopUpSectionPlaceholder}
          alt='topUpSectionPlaceholder'
        />
      </div>
    </>
  )
}