import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  value: boolean
}

const initialState: ThemeState = {
  value: localStorage.getItem('darkMode') === 'true',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLight: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('djawnd')
      state.value = false
    },
    setDark: (state) => {
      state.value = true
    },
    toggle: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLight, setDark, toggle } = themeSlice.actions

export default themeSlice.reducer
