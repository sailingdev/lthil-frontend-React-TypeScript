import { addTransaction, finalizeTransaction } from './transaction.actions'
import { createReducer, createSlice } from '@reduxjs/toolkit'

import { Transaction } from '../../types'

export interface TransactionState {
  transactions: {
    [chainId: number]: {
      [tx: string]: Transaction
    }
  }
}

const initialState = {
  transactions: {},
} as TransactionState

export default createSlice({
  name: 'transaction',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      addTransaction.fulfilled,
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
      finalizeTransaction.fulfilled,
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
  },
})
