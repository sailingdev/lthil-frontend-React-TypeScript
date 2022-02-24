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

import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { Txt } from './Txt'

const Symbol = (props: { symbol: string }) => {
  return <Txt.InputText tw='text-font-100'>{props.symbol}</Txt.InputText>
}

interface IInputFieldProps {
  label: string
  onChange: (value: string) => void
  value: string
  secondaryButton?: boolean
  symbol?: string
  button?: boolean
}

const SecondaryButton = (props: { label: string }) => {
  return (
    <button tw='border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2'>
      <Txt.Body2Regular>{props.label}</Txt.Body2Regular>
    </button>
  )
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
        {props.secondaryButton && <SecondaryButton label='Max' />}
        {props.button && (
          <Button
            css={[tw`h-8 bg-primary-400 dark:bg-primary-300`]}
            text='USDC'
            leftIcon={CurrEth}
            rightIcon={ArrowDown}
          />
        )}
        {props.symbol && <Symbol symbol={props.symbol} />}
      </div>
    </div>
  )
}
