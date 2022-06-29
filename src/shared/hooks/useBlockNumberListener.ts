import { useAsync } from 'react-use'
import { useWeb3React } from '@web3-react/core'

import { Ether } from '../../api/ether'
import { useIsConnected } from './useIsConnected'
import { useUpdateBlock } from '../../state/hooks'

export const useBlockNumberListener = () => {
  const { library } = useWeb3React<Ether>()
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
