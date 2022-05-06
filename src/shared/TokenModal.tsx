import 'twin.macro'

import { CenteredModal } from './CenteredModal'
import { InputField } from './InputField'
/** @jsxImportSource @emotion/react */
import { MagnifyingGlass } from 'phosphor-react'
import { Txt } from './Txt'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'
import { useState } from 'react'

interface IToken {
  name: string
  address: string
  symbol: string
  decimals: number
  chainId: number
  logoURI: string
}

interface ITokenModal {
  modalIsOpen: boolean
  onModalChange: (value: boolean) => void
  onSelect(token: any): void
}

export const TokenModal = (props: ITokenModal) => {
  const [search, setSearch] = useState('')
  const [filteredTokenList, setFilteredTokenList] = useState<IToken[]>(tokens)

  const searchOnChange = (value: string) => {
    setSearch(value)

    const val = value.trim().toLowerCase()
    setFilteredTokenList(
      tokens
        .filter(({ name }) => name.trim().toLowerCase().startsWith(val))
        .slice(0, 6),
    )
  }

  return (
    <CenteredModal
      tw='bg-secondary width[600px]'
      isOpen={props.modalIsOpen}
      onChange={props.onModalChange}
    >
      <div tw='flex flex-row justify-center items-center w-full'>
        <Txt.Heading2 tw='self-end'>Select a token</Txt.Heading2>
      </div>
      <InputField
        value={search}
        onChange={(value) => searchOnChange(value)}
        renderRight={<MagnifyingGlass tw='text-secondary' />}
      />
      <div tw='w-full height[1px] bg-primary-300 my-4'></div>
      <div tw='w-full height[384px]'>
        {filteredTokenList.map((token) => {
          return (
            <div
              key={token.name}
              tw='w-full flex flex-row justify-between cursor-pointer'
              onClick={() => props.onSelect(token)}
            >
              <div tw='flex flex-row justify-start items-center p-0 my-2'>
                <img tw='w-8 h-8 mr-4' src={token.logoURI} alt='token image' />
                <div tw='flex flex-col justify-start'>
                  <Txt.Body2Regular>{token.symbol}</Txt.Body2Regular>
                  <Txt.CaptionMedium>{token.name}</Txt.CaptionMedium>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
