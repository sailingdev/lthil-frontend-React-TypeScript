import { CreatableTransaction, FinalizableTransaction } from '../../types'

import { createAction } from '@reduxjs/toolkit'

export const addTransaction =
  createAction<CreatableTransaction>('transactions/add')
export const finalizeTransaction = createAction<FinalizableTransaction>(
  'transactions/finalize',
)
