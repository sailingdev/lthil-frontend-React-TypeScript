import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPosition } from '../../types'
import { initializePositions } from './position.actions'

export interface PositionState {
  positions: IPosition[] | undefined
}

const initialState = {
  positions: [],
} as PositionState

export default createSlice({
  name: 'positions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(
      initializePositions.fulfilled,
      (state, { payload }: PayloadAction<IPosition[]>) => {
        state.positions = payload
      },
    )
  },
})
