import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initializeAccountBalance, updateBlockNumber } from './network.actions'

export interface NetworkState {
  latestBlock: number | undefined
  balance: number | undefined
}

const initialState = {
  latestBlock: undefined,
  balance: undefined,
} as NetworkState

export default createSlice({
  name: 'network',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      updateBlockNumber.fulfilled,
      (state, { payload: block }: PayloadAction<number | undefined>) => {
        state.latestBlock = block
      },
    )
    builder.addCase(
      initializeAccountBalance.fulfilled,
      (state, { payload: balance }: PayloadAction<number>) => {
        state.balance = balance
      },
    )
  },
})
