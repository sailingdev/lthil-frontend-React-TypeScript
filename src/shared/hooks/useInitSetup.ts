import { useAsync } from 'react-use'

import {
  useInitAccountAddress,
  useInitAccountBalance,
  useInitPositions,
  useUpdateBlock,
} from '../../state/hooks'

import { useIsConnected } from './useIsConnected'

export const useInitSetup = () => {
  const isConnected = useIsConnected()
  const updateBlock = useUpdateBlock()
  const initAccountBalance = useInitAccountBalance()
  const initAccountAddress = useInitAccountAddress()
  const initActivePositions = useInitPositions()

  useAsync(async () => {
    if (!isConnected) {
      return updateBlock()
    }
    updateBlock()
    initAccountBalance()
    initAccountAddress()
    initActivePositions()
  }, [isConnected])
}
