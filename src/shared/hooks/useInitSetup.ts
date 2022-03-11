/** @jsxImportSource @emotion/react */

import {
  useInitAccountAddress,
  useInitAccountBalance,
  useInitStakeTokens,
  useUpdateBlock,
} from '../../state/hooks'

import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'

export const useInitSetup = () => {
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()
  const initAccountBalance = useInitAccountBalance()
  const initAccountAddress = useInitAccountAddress()
  const initUserStakes = useInitStakeTokens()

  useAsync(async () => {
    if (!isConnected) {
      return updateBlock()
    }
    updateBlock()
    initUserStakes() // TODO: This should be done on the stake page
    initAccountBalance()
    initAccountAddress()
  }, [isConnected])
}
