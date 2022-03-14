import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { StakeToken } from '../../types'
import { initializeUserStakes } from './stake.actions'

export interface StakeState {
  tokenStakeData: StakeToken[] | undefined
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
      (state, { payload: tokenStakeData }: PayloadAction<StakeToken[]>) => {
        state.tokenStakeData = tokenStakeData
      },
    )
  },
})
