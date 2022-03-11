import 'twin.macro'
import tw from 'twin.macro'
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
        {connectors.map(({ name, icon, connector }) => {
          // @ts-ignore
          const metamaskMissing = !window.ethereum && name === 'MetaMask'
          const Icon = icon

          return (
            <div
              key={name}
              tw='w-full flex flex-row justify-between cursor-pointer'
              onClick={async () => {
                if (!metamaskMissing) {
                  activate(connector)
                  props.onClose()
                }
              }}
            >
              <div tw='flex flex-row justify-start items-center p-0 my-2'>
                <Icon tw='h-8 w-8 m-2' />
                <div tw='flex flex-col justify-start'>
                  <Txt.Body2Regular
                    css={[
                      // @ts-ignore
                      metamaskMissing && tw`text-font-200`,
                    ]}
                  >
                    {name}
                    {metamaskMissing && ' (Not installed)'}
                  </Txt.Body2Regular>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
