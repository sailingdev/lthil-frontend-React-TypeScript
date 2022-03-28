/** @jsxImportSource @emotion/react */

import { Approval, ApprovalTransactionMeta, TransactionType } from '../../types'
import { useAddTransaction, useApprovalTransactions } from '../../state/hooks'
import { useEffect, useState } from 'react'

import { etherGlobal } from '../../api/ether'
import { useIsConnected } from './useIsConnected'

type ApprovalFunction = (
  token: string,
  destination: string,
) => Approval.PENDING | Approval.UNKNOWN

const useLazyApprovalTransactionState = (): ApprovalFunction => {
  const transactions = useApprovalTransactions()
  const getTransactionAproval = (token: string, destination: string) => {
    for (const t of transactions) {
      const meta = t.meta as ApprovalTransactionMeta
      if (destination !== meta.destination || token !== meta.token) {
        continue
      }
      if (!t.receipt) {
        return Approval.PENDING
      }
    }
    return Approval.UNKNOWN
  }
  return getTransactionAproval
}

export const useLazyApproval = () => {
  const getTransactionApproval = useLazyApprovalTransactionState()
  const addTransaction = useAddTransaction()
  const isConnected = useIsConnected()

  return async (
    token: string,
    destination: string,
    amount: number,
  ): Promise<Approval> => {
    try {
      if (!isConnected) {
        return Approval.UNKNOWN
      }
      const tokenAllowance = await etherGlobal.allowanceForToken(
        token,
        destination,
      )
      if (tokenAllowance >= amount) {
        return Approval.VERIFIED
      }

      const transactionApproval = getTransactionApproval(token, destination)
      if (transactionApproval === Approval.PENDING) {
        return Approval.PENDING
      }
      try {
        const transaction = await etherGlobal.approve(
          token,
          destination,
          amount,
        )
        if (!transaction) {
          return Approval.DENIED
        }
        addTransaction(TransactionType.APPROVAL, transaction.hash!, {
          destination,
          amount,
          token,
        } as ApprovalTransactionMeta)
        return Approval.PENDING
      } catch (e) {
        console.error(e)
        return Approval.DENIED
      }
    } catch (e) {
      console.error(e)
      return Approval.UNKNOWN
    }
  }
}

export const useApproval = (
  token: string | undefined,
  destination: string | undefined,
  amount: number | undefined,
) => {
  const [approval, setApproval] = useState<Approval | null>(null)
  const getApproval = useLazyApproval()
  const isConnected = useIsConnected()
  const transactions = useApprovalTransactions()
  const isMissingInfo = !token || !destination || !amount

  const onAsync = async () => {
    if (isMissingInfo) {
      return
    }
    try {
      const approval = await getApproval(token, destination, amount)
      setApproval(approval)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (isConnected) {
      onAsync()
    }
  }, [isConnected, token, destination, amount])

  useEffect(() => {
    if (isMissingInfo || !isConnected) {
      return
    }
    etherGlobal.allowanceForToken(token, destination).then((tokenAllowance) => {
      if (tokenAllowance >= amount) {
        setApproval(Approval.VERIFIED)
      }
    })
  }, [transactions])

  return approval
}
