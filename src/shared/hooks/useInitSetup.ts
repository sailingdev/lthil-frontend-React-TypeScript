/** @jsxImportSource @emotion/react */

import { useInitAccountBalance, useUpdateBlock } from '../../state/hooks'

import { Ether } from '../../ether'
import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'
import { useWeb3React } from '@web3-react/core'

export const useInitSetup = () => {
  const { library } = useWeb3React<Ether>()
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()
  const initAccountBalance = useInitAccountBalance()

  useAsync(async () => {
    if (!isConnected) {
      return updateBlock()
    }
    updateBlock()
    initAccountBalance()
  }, [isConnected])
}
