/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { useEffect, useState } from 'react'

import { Txt } from './Txt'

interface IInputFieldProps {
  label?: string
  onChange: (value: string) => void
  value: string
  renderRight?: React.ReactNode
  placeholder?: string
  className?: string | undefined
}

export const InputField = (props: IInputFieldProps) => {
  const [value, setValue] = useState(props.value)
  const [inputIsFocused, setInputIsFocused] = useState(false)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div
      className={props.className}
      tw='flex flex-col justify-center gap-1 my-2 w-full'
    >
      {props.label && <Txt.Body2Regular>{props.label}</Txt.Body2Regular>}
      <div
        css={[
          tw`flex flex-row items-center bg-primary-200 rounded-md tablet:height[48px] height[43px] px-3 gap-1`,
          inputIsFocused &&
            tw`outline-[#4E5F71 solid] dark:outline-[#A4B1BE solid]`,
        ]}
      >
        <input
          placeholder={props.placeholder}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          tw='flex-grow bg-primary-200 rounded-md text-input-text font-sans text-font font-normal focus:outline-none max-w-none'
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
