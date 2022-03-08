import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem('darkMode', store.getState().theme.value.toString())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
