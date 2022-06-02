import 'twin.macro'

import {
  showErrorNotification,
  showInfoNotification,
} from '../shared/notification'

/** @jsxImportSource @emotion/react */
import { ContentContainer } from '../shared/ContentContainer'
import { ContractFactory } from '../api/contract-factory'
import React from 'react'
import { Txt } from '../shared/Txt'
import { etherGlobal } from '../api/ether'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'
import tw from 'twin.macro'
import { useIsConnected } from '../shared/hooks/useIsConnected'

export const FaucetsPage = () => {
  const isConnected = useIsConnected()

  const onSelect = async (tokenAddress: string, tokenName: string) => {
    const contract: any = ContractFactory.getTokenContract(
      tokenAddress,
      etherGlobal.getSigner(),
    )
    try {
      await contract.mint(tokenAddress)
      showInfoNotification(`You redeemed ${tokenName}`)
    } catch (e) {
      console.error(e)
      showErrorNotification('Something went wrong')
    }
  }

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Faucets </Txt.Heading1>

          {!isConnected ? (
            <Txt.Body1Regular tw='mb-12'>
              Please connect with your wallet
            </Txt.Body1Regular>
          ) : (
            <div tw='flex flex-col min-width[320px] max-width[860px] w-full bg-primary-200 px-6 rounded-xl'>
              <div tw='w-full flex pt-6 pb-3 flex-row justify-between items-center cursor-pointer'>
                <div tw='w-full flex flex-row justify-start items-center p-0 my-2'>
                  <Txt.Body2Regular>Token</Txt.Body2Regular>
                </div>
              </div>
              <div tw='h-0.5 bg-primary-300' />
              {tokens.map((token, index) => (
                <React.Fragment key={token.address}>
                  <div
                    key={token.name}
                    tw='w-full flex py-5 flex-row justify-between items-center cursor-pointer'
                  >
                    <div tw='w-full flex flex-row justify-start items-center p-0 my-2'>
                      <img
                        tw='w-8 h-8 mr-4'
                        src={token.logoURI}
                        alt='token image'
                      />
                      <Txt.Body2Regular>{token.symbol}</Txt.Body2Regular>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      tw='flex flex-row justify-end'
                    >
                      <button
                        onClick={() => onSelect(token.address, token.symbol)}
                        css={[
                          tw`rounded-md py-1 px-2 border border-primary-400 text-font-100`,
                        ]}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                  {tokens.length - 1 !== index && (
                    <div tw='h-0.5 bg-primary-300' />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </ContentContainer>
  )
}
