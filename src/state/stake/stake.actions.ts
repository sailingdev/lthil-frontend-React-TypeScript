import { createAsyncThunk } from '@reduxjs/toolkit'
import tokenList from '../../assets/tokenlist.json'

export const initializeUserStakes = createAsyncThunk(
  'stake/initializeUserStakes',
  async () => {
    // TODO - CHAIN ID FILTER
    return tokenList.tokens.map((token) => ({
      name: token.symbol,
      apy: 1, // manually calculted
      tvl: 2, // vault.balance(tokenAddress)
      owned: 3, // vault.claimable(tokenAddress)
    }))
  },
)
