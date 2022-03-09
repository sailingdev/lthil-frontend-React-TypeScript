/** @jsxImportSource @emotion/react */

import {
  useInitAccountAddress,
  useInitAccountBalance,
  useUpdateBlock,
} from '../../state/hooks'

import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'

export const useInitSetup = () => {
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()
  const initAccountBalance = useInitAccountBalance()
  const initAccountAddress = useInitAccountAddress()

  useAsync(async () => {
    if (!isConnected) {
      return updateBlock()
    }
    updateBlock()
    initAccountBalance()
    initAccountAddress()
  }, [isConnected])
}
