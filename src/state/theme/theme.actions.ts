import { createAsyncThunk } from '@reduxjs/toolkit'

export const toggleTheme = createAsyncThunk('theme/toggleTheme', async () => {
  const oldValue = localStorage.getItem('darkMode') === 'true'
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', oldValue ? 'false' : 'true')
})
