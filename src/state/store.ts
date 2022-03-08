import { combineReducers, configureStore } from '@reduxjs/toolkit'

import themeReducer from './theme/theme.reducer'

const reducer = combineReducers({
  theme: themeReducer.reducer,
})

export const store = configureStore({ reducer })

store.subscribe(() => {})

export type RootState = ReturnType<typeof store.getState>
