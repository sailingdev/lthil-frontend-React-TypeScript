import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IParsedPositionWasOpenedEvent } from '../../types'

import { initializePositions } from './position.actions'

export interface PositionState {
  activePositions: IParsedPositionWasOpenedEvent[] | undefined
  closedAndLiquidatedPositions: IParsedPositionWasOpenedEvent[] | undefined
}

const initialState = {
  activePositions: [],
  closedAndLiquidatedPositions: [],
} as PositionState

export default createSlice({
  name: 'positions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      initializePositions.fulfilled,
      (
        state,
        {
          payload: positions,
        }: PayloadAction<{
          active: IParsedPositionWasOpenedEvent[]
          closedAndLiquidated: IParsedPositionWasOpenedEvent[]
        }>,
      ) => {
        state.activePositions = positions.active
        state.closedAndLiquidatedPositions = positions.closedAndLiquidated
      },
    )
  },
})
