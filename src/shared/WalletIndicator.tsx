/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { isMobile } from '../utils'
import { Txt } from './Txt'
import { useAccountAddress, useAccountBalance } from '../state/hooks'
import { useWeb3React } from '@web3-react/core'

import { ReactComponent as MetaMaskIcon } from '../assets/images/metamask.svg'
import { ReactComponent as WalletConnectIcon } from '../assets/images/walletconnect.svg'
import { useEffect } from 'react'

export const WalletIndicator = () => {
  const address = useAccountAddress()
  const balance = useAccountBalance()
  const ctx = useWeb3React()

  const connUrl = ctx.library.provider.connection.url
  let ProviderIcon = undefined

  if (connUrl == 'metamask') {
    ProviderIcon = <MetaMaskIcon tw='h-4 w-4' />
  } else if (connUrl == 'eip-1193:') {
    ProviderIcon = <WalletConnectIcon tw='h-4 w-4' />
  }

  return (
    <div tw='bg-primary-200 border-0 rounded-md cursor-pointer flex flex-row items-center h-9 max-h-9 tablet:h-10 tablet: max-h-10  desktop:h-11 desktop:max-h-11 px-2'>
      {!isMobile && (
        <>
          <Txt.ButtonMedium tw='mr-1'>
            {balance && balance!.substring(0, 4)}
          </Txt.ButtonMedium>
          <Txt.ButtonMedium tw='mr-2'>ETH</Txt.ButtonMedium>
        </>
      )}
      <div tw='h-7 max-h-7 tablet:h-8 tablet: max-h-8  desktop:h-8 desktop:max-h-8 px-2 rounded-md bg-primary-400 flex flex-row justify-center items-center gap-1 dark:bg-primary-100'>
        {ProviderIcon}
        <Txt.ButtonMedium tw='line-height[0px]'>{address![1]}</Txt.ButtonMedium>
      </div>
    </div>
  )
}
