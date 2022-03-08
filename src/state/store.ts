import { combineReducers, configureStore } from '@reduxjs/toolkit'

import networkReducer from './network/network.reducer'
import themeReducer from './theme/theme.reducer'

const reducer = combineReducers({
  theme: themeReducer.reducer,
  network: networkReducer.reducer,
})

export const store = configureStore({ reducer })

store.subscribe(() => {})

export type RootState = ReturnType<typeof store.getState>
