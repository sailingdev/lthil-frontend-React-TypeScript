import { createAsyncThunk } from '@reduxjs/toolkit'

export const toggleTheme = createAsyncThunk('theme/toggleTheme', async () => {
  const oldValue = localStorage.getItem('darkMode')
  localStorage.setItem('darkMode', oldValue ? 'false' : 'true')
})
