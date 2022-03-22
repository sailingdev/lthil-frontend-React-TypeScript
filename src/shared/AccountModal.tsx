import 'twin.macro'
import 'twin.macro'

import { ArrowSquareOut, Check, Copy } from 'phosphor-react'
import { useAccountAddress, useTransactions } from '../state/hooks'

import { CenteredModal } from './CenteredModal'
import ClipLoader from 'react-spinners/ClipLoader'
import { Txt } from './Txt'
import { getTransactionLabel } from '../utils'
import { showInfoNotification } from './notification'
import tw from 'twin.macro'
import { useProviderInfo } from './hooks/useProviderInfo'
import { useWeb3React } from '@web3-react/core'

interface IAccountModal {
  modalIsOpen: boolean
  onClose(): void
}
/** @jsxImportSource @emotion/react */

export const AccountModal = (props: IAccountModal) => {
  const { activate, deactivate } = useWeb3React()
  const [account, shortAccount] = useAccountAddress()
  const transactions = useTransactions()
  const provider = useProviderInfo()
  const Icon = provider?.icon

  return (
    <CenteredModal
      tw='bg-secondary min-width[450]'
      isOpen={props.modalIsOpen}
      onChange={props.onClose}
    >
      <div tw='w-full h-full flex flex-col'>
        <Txt.Heading2 tw='text-center mb-6'>Account</Txt.Heading2>
        <div tw='flex flex-row items-center justify-between mb-4'>
          <Txt.Body2Regular tw='flex-grow text-font-200'>
            Connected with {provider?.name ?? ''}
          </Txt.Body2Regular>
          <button
            tw='rounded-md py-1 px-2 border border-primary-400'
            onClick={() => {
              deactivate()
              props.onClose()
            }}
          >
            <Txt.CaptionMedium tw='text-white-100'>
              Disconnect
            </Txt.CaptionMedium>
          </button>
        </div>

        <div tw='flex flex-row items-center mb-3'>
          {Icon && <Icon tw='h-4 w-4 mr-2' />}
          <Txt.Body1Bold tw='text-white-100'>{shortAccount}</Txt.Body1Bold>
        </div>

        <div tw='flex flex-row items-center justify-center mb-6'>
          <div
            tw='flex items-center cursor-pointer mr-5'
            onClick={() => {
              navigator.clipboard.writeText(account!)
              showInfoNotification('Copied to clipboard')
            }}
          >
            <Copy tw='text-font-200 mr-2' />
            <Txt.Body2Regular tw='flex-grow text-font-200'>
              Copy address
            </Txt.Body2Regular>
          </div>
          <div
            tw='flex items-center cursor-pointer'
            onClick={() => {
              window.open(
                `https://rinkeby.etherscan.io/address/${account}`,
                '_blank',
              )
            }}
          >
            <ArrowSquareOut tw='text-font-200 mr-2' />
            <Txt.Body2Regular tw='flex-grow text-font-200'>
              View on explorer
            </Txt.Body2Regular>
          </div>
        </div>

        <div tw='w-full height[1px] bg-font-200' />
        <Txt.Heading2 tw='mt-6 text-center'>Transactions</Txt.Heading2>
        {transactions.length === 0 ? (
          <Txt.Body2Regular tw='mt-6 mb-5 flex-grow text-font-200 text-center'>
            Your transactions will appear here.
          </Txt.Body2Regular>
        ) : (
          <div></div>
        )}

        {transactions.map((t) => {
          return (
            <div tw='flex flex-row justify-between'>
              <div tw='flex flex-col justify-between'>
                <a
                  tw='mb-1'
                  rel='noreferrer'
                  href={`https://rinkeby.etherscan.io/tx/${t.tx}`}
                  target='_blank'
                >
                  <Txt.MobileMedium tw='text-secondary underline'>
                    Link
                  </Txt.MobileMedium>
                </a>
                <Txt.Body2Regular tw='text-font-200'>
                  {/* @ts-ignore */}
                  {getTransactionLabel(t)}
                </Txt.Body2Regular>
              </div>
              {t.status === 'pending' ? (
                <div tw='flex flex-col justify-between items-center'>
                  <ClipLoader loading color={'blue'} size={18} tw='mb-1.5' />
                  <Txt.Body2Regular tw='text-font-200'>
                    Pending
                  </Txt.Body2Regular>
                </div>
              ) : (
                <div tw='flex flex-col items-center'>
                  <div tw='flex items-center justify-center h-8 w-8 rounded-3xl bg-success'>
                    <Check tw='text-primary w-5 h-5' />
                  </div>
                  <Txt.Body2Regular tw='text-success'>
                    Finished
                  </Txt.Body2Regular>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
