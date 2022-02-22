/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { forwardRef } from 'react'

interface ISliderProps {
  min: number
  max: number
  defaultValue: number
  dots?: boolean
  marks?: any
}

export const SliderBar = (props: ISliderProps) => {
  const { min, max, defaultValue, dots, marks } = props
  return (
    <div>
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        dots={dots}
        railStyle={tw`bg-primary-300 height[3px]`}
        trackStyle={tw`bg-primary-300 height[3px]`}
        handleStyle={tw`bg-secondary border-0 shadow-none`}
        dotStyle={tw`bg-secondary border-0 height[3px] width[3px] marginBottom[3px]`}
        activeDotStyle={tw`bg-secondary border-0 height[7px] width[7px] marginBottom[1px]`}
        marks={marks}
      />
    </div>
  )
}
