import 'twin.macro'
import tw from 'twin.macro'

/** @jsxImportSource @emotion/react */
import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  MutableRefObject,
} from 'react'

import { Txt } from './Txt'

interface IInputFieldProps {
  label: string
  onChange: (value: string) => void
  value: string
  renderRight: React.ReactNode
}

export const InputField = (props: IInputFieldProps) => {
  const [value, setValue] = useState(props.value)
  const [inputIsFocused, setInputIsFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div tw='flex flex-col justify-center gap-1 my-2'>
      <Txt.Body2Regular>{props.label}</Txt.Body2Regular>
      <div
        css={[
          tw`flex flex-row items-center bg-primary-200 rounded-md tablet:height[48px] height[43px] px-3 gap-3`,
          inputIsFocused &&
            tw`outline-[#4E5F71 solid] dark:outline-[#A4B1BE solid]`,
        ]}
      >
        <input
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          ref={inputRef}
          tw='flex-grow bg-primary-200 rounded-md text-input-text font-sans text-font font-normal focus:outline-none'
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
