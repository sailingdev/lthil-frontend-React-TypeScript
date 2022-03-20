import {
  ISearchParams,
  Transaction,
  TransactionReceipt,
  TransactionType,
} from '../types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  addTransaction,
  finalizeTransaction,
} from './transaction/transaction.actions'
import {
  initializeAccountAddress,
  initializeAccountBalance,
  updateBlockNumber,
} from './network/network.actions'

import { RootState } from './store'
import { initializePositionsData } from './marginTrading/marginTrading.actions'
// @ts-ignore
import { initializeUserStakes } from './stake/stake.actions'
import { toggleTheme } from './theme/theme.actions'
import { useWeb3React } from '@web3-react/core'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// THEME HOOKS

export const useTheme = () => useAppSelector((state) => state.theme.value)

export const useToggleTheme = () => {
  const dispatch = useDispatch()
  return () => dispatch(toggleTheme())
}

// NETWORK HOOKS

export const useLatestBlock = () =>
  useAppSelector((state) => state.network.latestBlock)

export const useUpdateBlock = () => {
  const dispatch = useDispatch()
  return () => dispatch(updateBlockNumber())
}

export const useAccountBalance = () =>
  useAppSelector((state) => state.network.accountBalance)

export const useInitAccountBalance = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializeAccountBalance())
}

export const useAccountAddress = () => {
  const address = useAppSelector((state) => state.network.accountAddress)
  if (address) {
    const shortAddress = `${address!.substring(0, 6)}...${address!.substring(
      address!.length - 5,
      address!.length,
    )}`
    return [address, shortAddress]
  }
  return [undefined, undefined]
}

export const useInitAccountAddress = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializeAccountAddress())
}

// STAKE HOOKS

export const useStakeTokens = (params: ISearchParams) => {
  const stakes = useAppSelector((state) => state.stake.tokenStakeData)

  const filteredStakes = (stakes ?? []).filter((s) =>
    s.vaultName.toLowerCase().trim().includes(params.term.toLowerCase().trim()),
  )
  filteredStakes.sort((s1, s2) => {
    // @ts-ignore
    const p1 = s1[params.orderField]
    // @ts-ignore
    const p2 = s2[params.orderField]
    return params.order === 'DESC' ? p2 - p1 : p1 - p2
  })
  return filteredStakes
}

export const useInitStakeTokens = () => {
  const dispatch = useDispatch()
  const { chainId } = useWeb3React()
  return () => dispatch(initializeUserStakes(chainId!))
}

// MARGIN TRADING HOOKS

export const usePositions = () => {
  return useAppSelector((state) => state.marginTrading.positions)
}

export const useInitPositions = () => {
  const dispatch = useDispatch()
  return () => dispatch(initializePositionsData())
}

// TRANSACTION HOOKS

export const useTransactions = () => {
  const { chainId } = useWeb3React()
  return useAppSelector<Transaction[]>((state) => {
    if (!chainId) {
      return []
    }
    return Object.values(state.transactions.transactions[chainId!] ?? {})
  })
}
export const usePendingTransactions = () => {
  const transactions = useTransactions()
  return transactions.filter((t) => t.status === 'pending')
}
export const useVerifiedTransactions = () => {
  const transactions = useTransactions()
  return transactions.filter((t) => t.status === 'verified')
}
export const useApprovalTransactions = () => {
  const transactions = useTransactions()
  return transactions.filter((t) => t.type === TransactionType.APPROVAL)
}

export const useAddTransaction = () => {
  const { chainId } = useWeb3React()
  const dispatch = useDispatch()
  return (type: TransactionType, tx: string, meta: any) => {
    if (!chainId) {
      return
    }
    return dispatch(
      addTransaction({
        chainId,
        type,
        tx,
        meta,
      }),
    )
  }
}
export const useFinalizeTransaction = () => {
  const { chainId } = useWeb3React()
  const dispatch = useDispatch()
  return (tx: string, receipt: TransactionReceipt) => {
    if (!chainId) {
      return
    }
    return dispatch(finalizeTransaction({ chainId, receipt, tx }))
  }
}
