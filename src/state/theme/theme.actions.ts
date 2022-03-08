import { createAsyncThunk } from '@reduxjs/toolkit'

export const toggleTheme = createAsyncThunk('theme/toggleTheme', async () => {
  document.documentElement.classList.toggle('dark')
  return null
})
