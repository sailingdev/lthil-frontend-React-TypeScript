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
      tw='bg-secondary'
      isOpen={props.modalIsOpen}
      onChange={props.onClose}
    >
      <div tw='flex flex-col justify-center items-center'>
        <Txt.Heading2 tw='self-end'>Connect to a wallet</Txt.Heading2>
      </div>
      <Txt.Body2Regular tw='w-96 self-start my-3'>
        By connecting a wallet, I agree to Ithil’s <u>Terms of Use</u>,{' '}
        <u>Cookies Policy</u>
        and <u>Privacy Policy</u>.
      </Txt.Body2Regular>
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
              <div tw='flex flex-row justify-start items-center p-0 my-2 gap-2'>
                <Icon tw='h-9 w-9 m-2' />
                <div tw='flex flex-col justify-start'>
                  <Txt.Body2Bold
                    css={[
                      // @ts-ignore
                      metamaskMissing && tw`text-font-200 text-secondary`,
                    ]}
                  >
                    {name}
                    {metamaskMissing && ' (Not installed)'}
                  </Txt.Body2Bold>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </CenteredModal>
  )
}
