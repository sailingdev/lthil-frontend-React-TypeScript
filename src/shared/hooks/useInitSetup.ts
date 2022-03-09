/** @jsxImportSource @emotion/react */

import { useInitAccountBalance, useUpdateBlock } from '../../state/hooks'

import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'

export const useInitSetup = () => {
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
