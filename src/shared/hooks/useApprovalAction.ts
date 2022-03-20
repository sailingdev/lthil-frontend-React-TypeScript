/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react'

import { Approval } from '../../types'
import { etherGlobal } from '../../api/ether'
import { useApprovalTransactions } from '../../state/hooks'
import { useIsConnected } from './useIsConnected'
import { useLazyApproval } from './useApproval'

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
