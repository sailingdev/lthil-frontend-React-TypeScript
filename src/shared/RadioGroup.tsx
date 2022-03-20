import 'twin.macro'
import 'rc-slider/assets/index.css'

import { ReactComponent as RadioButtonNotSelected } from '../assets/images/radioButton/notSelected.svg'
import { ReactComponent as RadioButtonSelected } from '../assets/images/radioButton/selected.svg'
import { Txt } from './Txt'
import tw from 'twin.macro'
/** @jsxImportSource @emotion/react */
import { useState } from 'react'

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
