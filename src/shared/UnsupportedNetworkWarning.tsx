import 'twin.macro'

import { Txt } from './Txt'
import { Warning } from 'phosphor-react'
import { allowedChainIds } from './test/connectors'
import { useIsConnected } from './hooks/useIsConnected'
import { useWeb3React } from '@web3-react/core'

/** @jsxImportSource @emotion/react */

export const UnsupportedNetworkWarning = () => {
  const { chainId } = useWeb3React()
  const isConnected = useIsConnected()
  if (!isConnected) {
    return null
  }

  const isSupportedNetwork = allowedChainIds.includes(chainId!)
  if (isSupportedNetwork) {
    return null
  }
  return (
    <div tw='h-16 w-full flex bg-error justify-center items-center space-x-2.5'>
      <Warning tw='text-white-100 h-5 w-5' />

      <Txt.CaptionMedium tw='text-white-100'>
        Unsupported network, please change your network
      </Txt.CaptionMedium>
    </div>
  )
}
