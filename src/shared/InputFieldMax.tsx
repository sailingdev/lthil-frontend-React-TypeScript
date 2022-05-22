/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { useEffect, useState } from 'react'
import { etherGlobal } from '../api/ether'

import { Txt } from './Txt'
import { BigNumber, ethers } from 'ethers'

interface IInputFieldMaxProps {
  label?: string
  onChange: (value: string) => void
  renderRight?: React.ReactNode
  value: string
  unit: string
  address: string
  placeholder?: string
  className?: string | undefined
  onMaxClick?: () => void
}

export const InputFieldMax = (props: IInputFieldMaxProps) => {
  const [value, setValue] = useState(props.value)
  const [inputIsFocused, setInputIsFocused] = useState(false)

  const getMax = async (tokenAddress: string) => {
    const getMax = await etherGlobal.getMaxDepositAmount(tokenAddress)
    setValue(ethers.utils.formatUnits(getMax).toString())
  }

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
          tw='flex-grow bg-primary-200 rounded-md text-input-text font-sans text-font font-normal focus:outline-none max-w-none min-width[20px]'
          type='text'
          value={value}
          onChange={({ target: { value } }) => {
            setValue(value)
            props.onChange(value)
          }}
        />
        <button
          onClick={() => getMax(props.address)}
          css={[
            tw`border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2`,
          ]}
        >
          <Txt.Body2Regular>Max</Txt.Body2Regular>
        </button>
        <Txt.InputText tw='text-font-100'>{props.unit}</Txt.InputText>
      </div>
    </div>
  )
}
