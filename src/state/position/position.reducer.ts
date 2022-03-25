import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IParsedPositionWasOpenedEvent } from '../../types'

import { initializeActivePositions } from './position.actions'

export interface PositionState {
  activePositions: IParsedPositionWasOpenedEvent[] | undefined
}

const initialState = {
  activePositions: [],
} as PositionState

export default createSlice({
  name: 'positions',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      initializeActivePositions.fulfilled,
      (
        state,
        {
          payload: activePositions,
        }: PayloadAction<IParsedPositionWasOpenedEvent[]>,
      ) => {
        state.activePositions = activePositions
      },
    )
  },
})
