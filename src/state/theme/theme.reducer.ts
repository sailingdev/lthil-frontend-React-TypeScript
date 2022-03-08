import { createReducer } from '@reduxjs/toolkit'

import { toggle } from './theme.actions'

export interface ThemeState {
  value: boolean
}

const initialState: ThemeState = {
  value: localStorage.getItem('darkMode') === 'true',
}

export default createReducer<ThemeState>(initialState, (builder) => {
  builder.addCase(toggle, (state) => {
    state.value = !state.value
  })
})
