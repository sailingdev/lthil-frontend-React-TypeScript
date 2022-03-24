import { combineReducers, configureStore } from '@reduxjs/toolkit'

import networkReducer from './network/network.reducer'
import stakeReducer from './stake/stake.reducer'
import themeReducer from './theme/theme.reducer'
import transactionReducer from './transaction/transaction.reducer'
import positionReducer from './position/position.reducer'

const reducer = combineReducers({
  theme: themeReducer.reducer,
  network: networkReducer.reducer,
  stake: stakeReducer.reducer,
  transactions: transactionReducer,
  positions: positionReducer.reducer,
})

export const store = configureStore({ reducer })

store.subscribe(() => {})

export type RootState = ReturnType<typeof store.getState>
