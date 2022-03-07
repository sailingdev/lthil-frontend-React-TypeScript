/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Question } from 'phosphor-react'

import { Txt } from './Txt'
interface ISliderProps {
  label?: string
  min: number
  max: number
  marks?: any
  onChange?: (value: number) => void
  value: number
  step?: number
  tooltip?: boolean
}

export const SliderBar = (props: ISliderProps) => {
  const { min, max, marks, onChange, value, step } = props
  return (
    <div tw='my-2 flex w-full flex-col gap-4'>
      <div tw='flex flex-row gap-2 items-center text-font-200'>
        {props.label && (
          <Txt.Body2Regular tw='self-start'>{props.label}</Txt.Body2Regular>
        )}
        {props.tooltip && <Question tw='dark:text-font-200' />}
      </div>
      <span tw='px-2'>
        <Slider
          onChange={onChange}
          min={min}
          max={max}
          value={value}
          step={step}
          railStyle={tw`bg-primary-400 height[3px]`}
          trackStyle={tw`bg-primary-400 height[3px]`}
          handleStyle={tw`bg-secondary border-0 shadow-none`}
          dotStyle={tw`bg-secondary border-0 height[3px] width[3px] marginBottom[3px]`}
          // activeDotStyle={tw`bg-secondary border-0 height[7px] width[7px] marginBottom[1px]`}
          marks={marks}
        />
      </span>
    </div>
  )
}
