import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { initializeUserStakes } from './stake.actions'

export interface IStakeToken {
  vaultName: string
  annualPositionYield: {
    value: string
    format: string
  }
  totalValueLocked: {
    currencyValue: number
    format: string
  }
  owned: {
    currencyValue: number
    format: string
  }
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
