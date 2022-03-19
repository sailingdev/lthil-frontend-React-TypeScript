import { addTransaction, finalizeTransaction } from './transaction.actions'

import { Transaction } from '../../types'
import { createReducer } from '@reduxjs/toolkit'
import { supportedChainIds } from '../../shared/test/connectors'

export interface TransactionState {
  transactions: {
    [chainId: number]: {
      [tx: string]: Transaction
    }
  }
}
supportedChainIds

const initialState = {
  transactions: {},
} as TransactionState

export default createReducer(initialState, (builder) => {
  builder.addCase(
    addTransaction,
    ({ transactions }, { payload: { chainId, tx, ...rest } }) => {
      const transactionChain = transactions[chainId] ?? {}
      transactionChain[tx] = {
        ...rest,
        chainId,
        tx,
        status: 'pending',
      }
      transactions[chainId] = transactionChain
    },
  )
  builder.addCase(
    finalizeTransaction,
    ({ transactions }, { payload: { chainId, receipt, tx } }) => {
      const transactionChain = transactions[chainId] ?? {}
      const transaction = transactionChain[tx]
      if (!transaction) {
        throw new Error('No such transaction')
      }
      if (transaction.status === 'verified') {
        throw new Error('Transaction already verified')
      }

      transactionChain[tx] = {
        ...transactionChain[tx],
        receipt,
        tx,
        status: 'verified',
      }
    },
  )
})
