/** @jsxImportSource @emotion/react */

import {
  useInitAccountAddress,
  useInitAccountBalance,
  useInitStakeTokens,
  useUpdateBlock,
  useInitPositions,
} from '../../state/hooks'

import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'

export const useInitSetup = () => {
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()
  const initAccountBalance = useInitAccountBalance()
  const initAccountAddress = useInitAccountAddress()
  const initPositions = useInitPositions()

  useAsync(async () => {
    if (!isConnected) {
      return updateBlock()
    }
    updateBlock()
    initAccountBalance()
    initAccountAddress()
    initPositions()
  }, [isConnected])
}
