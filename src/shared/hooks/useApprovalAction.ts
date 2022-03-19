/** @jsxImportSource @emotion/react */

import { Approval, ApprovalTransactionMeta, TransactionType } from '../../types'
import { useAddTransaction, useApprovalTransactions } from '../../state/hooks'
import { useApproval, useLazyApproval } from './useApproval'
import { useEffect, useState } from 'react'

import { etherGlobal } from '../../api/ether'
import { useAsync } from 'react-use'
import { useIsConnected } from './useIsConnected'

export interface IUseApprovalActionParams {
  approvalMeta: {
    token: string
    destination: string
    amount: number
  }
  onApproval: CallableFunction
}
export const useApprovalAction = ({
  approvalMeta,
  onApproval,
}: IUseApprovalActionParams): [Approval, CallableFunction] => {
  const [approval, setApproval] = useState<Approval>(Approval.UNKNOWN)
  const getApproval = useLazyApproval()
  const transactions = useApprovalTransactions()
  const isConnected = useIsConnected()

  useEffect(() => {
    if (!isConnected) {
      return
    }
    etherGlobal
      .allowanceForToken(approvalMeta.token, approvalMeta.destination)
      .then((tokenAllowance) => {
        if (tokenAllowance >= approvalMeta.amount) {
          setApproval(Approval.VERIFIED)
        }
      })
  }, [transactions, isConnected])

  return [
    approval,
    // @ts-ignore
    async (...params) => {
      if (approval === Approval.VERIFIED) {
        onApproval(...params)
      } else {
        const determinedApproval = await getApproval(
          approvalMeta.token,
          approvalMeta.destination,
          approvalMeta.amount,
        )
        setApproval(determinedApproval)
      }
    },
  ]
}
