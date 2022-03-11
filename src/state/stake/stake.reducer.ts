import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { initializeUserStakes } from './stake.actions'

export interface IStakeToken {
  name: string
  logo: string
  // tvl: string
  owned: any
}

export interface StakeState {
  tokenStakeData: IStakeToken[] | undefined
}

const initialState = {
  tokenStakeData: undefined,
} as StakeState

export default createSlice({
  name: 'stake',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      initializeUserStakes.fulfilled,
      (state, { payload: tokenStakeData }: PayloadAction<IStakeToken[]>) => {
        state.tokenStakeData = tokenStakeData
      },
    )
  },
})
