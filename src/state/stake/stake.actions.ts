import { StakeToken } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../ether'
import tokenList from '../../assets/tokenlist.json'

export const initializeUserStakes = createAsyncThunk<any, number>(
  'stake/initializeUserStakes',
  async (chainId) => {
    const chainTokens = tokenList.tokens.filter(
      (token) => token.chainId == chainId,
    )
    const stakes: StakeToken[] = []

    for (const token of chainTokens) {
      // TODO VALENTIN TRANSFORM totalValueLocked and owned from string to number and remove these two @ts-ignore
      const totalValueLocked = await etherGlobal.getTokenTvl(token.address)
      const owned = await etherGlobal.getMaxWithdrawAmount(token.address)
      stakes.push({
        vaultName: token.name,
        annualPositionYield: 1,
        // @ts-ignore
        totalValueLocked,
        // @ts-ignore
        owned,
      })
    }
    return stakes
  },
)
