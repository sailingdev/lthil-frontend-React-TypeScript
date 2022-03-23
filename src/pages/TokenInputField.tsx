/** @jsxImportSource @emotion/react */

import { ArrowDown } from 'phosphor-react'
import { Button } from '../shared/Button'
import { InputField } from '../shared/InputField'
import { TokenModal } from '../shared/TokenModal'
import { Txt } from '../shared/Txt'
import tw from 'twin.macro'
import { useState } from 'react'

interface ITokenInputField {
  label: string
  value: string
  setValue(value: string): void
  placeholder?: string
  onTokenChange(token: any): void
  token: any
}
export const TokenInputField = (props: ITokenInputField) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button
        css={[
          tw`bg-primary-400 dark:bg-primary-300 h-6 tablet:h-7 desktop:h-8`,
        ]}
        text={props.token.symbol}
        leftIcon={() => (
          <img tw='w-4 h-4 mr-1' src={props.token.logoURI} alt='token image' />
        )}
        rightIcon={ArrowDown}
        onClick={() => setIsModalOpen(true)}
      />
      <TokenModal
        modalIsOpen={isModalOpen}
        onModalChange={(value) => {
          setIsModalOpen(false)
        }}
        onSelect={(token) => {
          props.onTokenChange(token)
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
