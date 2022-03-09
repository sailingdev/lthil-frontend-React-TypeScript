import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  initializeAccountAddress,
  initializeAccountBalance,
  updateBlockNumber,
} from './network.actions'

export interface NetworkState {
  latestBlock: number | undefined
  accountAddress: string | undefined
  accountBalance: string | undefined
}

const initialState = {
  latestBlock: undefined,
  accountAddress: undefined,
  accountBalance: undefined,
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
      (state, { payload: balance }: PayloadAction<string | undefined>) => {
        state.accountBalance = balance
      },
    )
    builder.addCase(
      initializeAccountAddress.fulfilled,
      (state, { payload: address }: PayloadAction<string | undefined>) => {
        state.accountAddress = address
      },
    )
  },
})
