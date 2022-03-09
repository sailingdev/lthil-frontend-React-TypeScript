/** @jsxImportSource @emotion/react */

import { Ether } from '../../ether'
import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'
import { useUpdateBlock } from '../../state/hooks'
import { useWeb3React } from '@web3-react/core'

export const useBlockNumberListener = () => {
  const { library, account } = useWeb3React<Ether>()
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()

  useAsync(async () => {
    const provider = library!.getProvider()
    provider.on('block', updateBlock)

    return () => {
      provider.removeListener('block', updateBlock)
    }
  }, [isConnected])
}
