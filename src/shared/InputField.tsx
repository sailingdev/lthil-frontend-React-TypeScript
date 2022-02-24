import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'

import { Txt } from './Txt'

export const InputField = (props: {
  label: string
  onChange: (value: string) => void
  value: string
  renderRight?: any
}) => {
  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div tw='flex flex-col justify-start gap-1 my-2'>
      <Txt.Body2Regular>{props.label}</Txt.Body2Regular>
      <div tw='flex flex-row bg-primary-200'>
        <input
          tw='flex-grow bg-primary-200 text-secondary rounded-md text-input-text font-sans text-font font-normal tablet:height[48px] height[43px] p-4'
          type='text'
          value={value}
          onChange={({ target: { value } }) => {
            setValue(value)
            props.onChange(value)
          }}
        />
        {props.renderRight}
      </div>
    </div>
  )
}
