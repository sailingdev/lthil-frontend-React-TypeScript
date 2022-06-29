import { useWeb3React } from '@web3-react/core'
import { useAsync } from 'react-use'

import { Ether, etherGlobal } from '../../api/ether'
import {
  useFinalizeTransaction,
  useLatestBlock,
  usePendingTransactions,
} from '../../state/hooks'

import { useIsConnected } from './useIsConnected'

export const useVerifyTransaction = () => {
  const { library, chainId } = useWeb3React<Ether>()
  const isConnected = useIsConnected()
  const block = useLatestBlock()
  const pendingTransactions = usePendingTransactions()
  const finalizeTransaction = useFinalizeTransaction()
  useAsync(async () => {
    if (!isConnected || !chainId || !library || !block) {
      return
    }
    for (const t of pendingTransactions) {
      try {
        const receipt = await etherGlobal.getSerializableTransactionReceipt(
          t.tx,
        )
        if (receipt) {
          finalizeTransaction(t.tx, receipt)
        }
      } catch (e) {
        console.error(e)
      }
    }
    return () => {}
  }, [isConnected, library, chainId, block])
}
