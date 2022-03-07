/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import 'twin.macro'
import tw from 'twin.macro'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { Txt } from './Txt'
import { ReactComponent as RadioButtonSelected } from '../assets/radioButton/selected.svg'
import { ReactComponent as RadioButtonNotSelected } from '../assets/radioButton/notSelected.svg'

interface IRadioItem {
  label: string
  value: string
}

interface IRadioGroupProps {
  label?: string
  items: IRadioItem[]
}

const RadioButton = (props: {
  selected: boolean
  value: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button tw='flex flex-row items-center gap-2' onClick={props.onClick}>
      {props.selected ? <RadioButtonSelected /> : <RadioButtonNotSelected />}
      <Txt.Body2Regular css={[!props.selected && tw`text-font-100`]}>
        {props.value}
      </Txt.Body2Regular>
    </button>
  )
}

export const RadioGroup = (props: IRadioGroupProps) => {
  const [activeButton, setActiveButton] = useState<any>(0)

  const { label, items } = props
  return (
    <div tw='w-full flex flex-col gap-3'>
      <Txt.Body2Regular>{label}:</Txt.Body2Regular>
      <div tw='flex flex-row gap-10'>
        {props.items.map((t, i) => (
          <RadioButton
            key={`${i}`}
            selected={activeButton === i}
            value={t.label}
            onClick={() => setActiveButton(i)}
          />
        ))}
      </div>
    </div>
  )
}
