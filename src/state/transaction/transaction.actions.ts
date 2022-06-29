import { createAsyncThunk } from '@reduxjs/toolkit'

import { getTransactionLabel } from '../../utils'
import { showInfoNotification } from '../../shared/notification'
import { CreatableTransaction, FinalizableTransaction } from '../../types'

export const addTransaction = createAsyncThunk<
  CreatableTransaction,
  CreatableTransaction
>('transactions/add', async (t) => {
  showInfoNotification(`${getTransactionLabel(t)} pending`)
  return t
})

export const finalizeTransaction = createAsyncThunk<
  FinalizableTransaction,
  FinalizableTransaction
>('transactions/finalize', async (t) => {
  showInfoNotification(`Transaction verified`)
  return t
})
