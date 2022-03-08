import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../ether'

export const initializeAccountBalance = createAsyncThunk(
  'network/initializeAccountBalance',
  async () => {
    const amount = await etherGlobal.getBalance()
    return amount.toNumber()
  },
)
export const updateBlockNumber = createAsyncThunk(
  'network/updateBlockNumber',
  async () => {
    return etherGlobal.getBlockNumber()
  },
)
