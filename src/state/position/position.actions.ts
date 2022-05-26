import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'

export const initializePositions = createAsyncThunk(
  'positions/initializeUserPositions',
  async () => {
    const userAddress = await etherGlobal.getAccountAddress()
    try {
      const positions = await etherGlobal.position.getUserPositions(
        userAddress!,
      )
      return positions
    } catch (e) {
      console.error(e)
    }
  },
)
