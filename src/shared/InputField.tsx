/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useState, ChangeEvent } from 'react'

import { Txt } from './Txt'

export const InputField = (props: {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}) => {
  const { label, value, onChange } = props

  return (
    <div tw='flex flex-col justify-start gap-1 my-2'>
      <Txt.Body2Regular>{label}</Txt.Body2Regular>
      <input
        tw='bg-primary-200 text-secondary rounded-md text-input-text font-sans text-font font-normal tablet:height[48px] height[43px] p-4'
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
