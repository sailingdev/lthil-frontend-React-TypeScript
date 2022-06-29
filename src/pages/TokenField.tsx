/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { useState } from 'react'
import { CaretDown } from 'phosphor-react'

import { Button } from '../shared/Button'
import { TokenModal } from '../shared/TokenModal'
import { TokenDetails } from '../types'
interface ITokenField {
  onTokenChange(token: TokenDetails): void
  token: TokenDetails
}
export const TokenField = (props: ITokenField) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button
        css={[
          tw`bg-primary-400 dark:bg-primary-300 h-9 tablet:h-10 desktop:h-11 px-2`,
        ]}
        text={props.token.symbol}
        leftIcon={() => (
          <img tw='w-4 h-4 mr-1' src={props.token.logoURI} alt='token image' />
        )}
        rightIcon={CaretDown}
        onClick={() => setIsModalOpen(true)}
      />
      <TokenModal
        modalIsOpen={isModalOpen}
        onModalChange={() => {
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
