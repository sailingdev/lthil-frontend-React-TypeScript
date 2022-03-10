import 'twin.macro'

import { CenteredModal } from './CenteredModal'
import { Txt } from './Txt'
import { connectors } from './test/connectors'
import { useWeb3React } from '@web3-react/core'

interface IWalletModal {
  modalIsOpen: boolean
  onClose(): void
}
/** @jsxImportSource @emotion/react */

export const WalletModal = (props: IWalletModal) => {
  const { activate } = useWeb3React()

  return (
    <CenteredModal
      tw='bg-secondary width[600px]'
      isOpen={props.modalIsOpen}
      onChange={props.onClose}
    >
      <div tw='flex flex-row justify-center items-center w-full'>
        <Txt.Heading2 tw='self-end'>Select wallet provider</Txt.Heading2>
      </div>

      <div tw='w-full height[1px] bg-primary-300 my-4'></div>
      <div tw='w-full height[384px]'>
        {connectors.map(({ name, connector }) => {
          return (
            <div
              key={name}
              tw='w-full flex flex-row justify-between cursor-pointer'
              onClick={async () => {
                // TODO ADD INSTALL METAMASK MESSAGE
                activate(connector)
                props.onClose()
              }}
            >
              <div tw='flex flex-row justify-start items-center p-0 my-2'>
                {/* TODO PROVIDER LOGO */}
                {/* <img tw='w-8 h-8 mr-4' src={token.logoURI} alt='token image' /> */}
                <div tw='flex flex-col justify-start'>
                  <Txt.Body2Regular>{name}</Txt.Body2Regular>
                  {/* <Txt.CaptionMedium>{token.name}</Txt.CaptionMedium> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
