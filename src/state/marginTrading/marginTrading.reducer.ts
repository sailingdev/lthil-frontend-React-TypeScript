import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initializePositionsData } from './marginTrading.actions'

import { Maybe } from '../../types'

export interface IPositionRow {
  tokenPair: string
  position: string
  profit: {
    currencyValue: number
    percentageValue: number
    format: string
  }
  trend: string
}

export interface MarginTradingState {
  positions: any[] | undefined
}

const initialState = {
  positions: undefined,
} as MarginTradingState

export default createSlice({
  name: 'marginTrading',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      initializePositionsData.fulfilled,
      (state, { payload: positions }: PayloadAction<any[]>) => {
        state.positions = positions
      },
    )
  },
})
