import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../ether'

import { IStakeToken } from './stake.reducer'
import tokenList from '../../assets/tokenlist.json'

export const initializeUserStakes = createAsyncThunk(
  'stake/initializeUserStakes',
  async () => {
    const stakeTokenList: IStakeToken[] = []
    tokenList.tokens.forEach((token) => {
      stakeTokenList.push({
        name: token.symbol,
        apy: 1,
        tvl: 2,
        owned: 3,
      })
    })
    return []
  },
)
