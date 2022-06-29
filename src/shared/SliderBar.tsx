/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import Slider from 'rc-slider'

import { Tooltip } from './Tooltip'
import { Txt } from './Txt'

import 'rc-slider/assets/index.css'

interface ISliderProps {
  label?: string
  min: number
  max: number
  marks?: any
  onChange?: (value: number) => void
  value: number
  step?: number
  tooltipText?: string
}

export const SliderBar = (props: ISliderProps) => {
  const { min, max, marks, onChange, value, step } = props
  return (
    <div tw='my-2 flex w-full flex-col gap-4'>
      <div tw='flex flex-row gap-2 items-center text-font-200'>
        {props.label && (
          <Txt.Body2Regular tw='self-start'>
            {props.label + ':  ' + props.value}
          </Txt.Body2Regular>
        )}
        {props.tooltipText && <Tooltip text={props.tooltipText} />}
      </div>
      <span tw='px-2'>
        {/* @ts-ignore */}
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
