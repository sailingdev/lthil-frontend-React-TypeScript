import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initializeUserStakes } from './stake.actions'

export interface IStakeToken {
  name: string
  apy: any
  tvl: any
  owned: any
}

export interface StakeState {
  tokenStakeData: IStakeToken[] | undefined
}

const initialState = {
  // TODO: Random state just for testing
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
