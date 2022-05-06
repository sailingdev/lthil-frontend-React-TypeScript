import { StakeToken } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'

export const initializeUserStakes = createAsyncThunk<any, number>(
  'stake/initializeUserStakes',
  async (chainId) => {
    const chainTokens = tokens.filter((token) => token.chainId == chainId)
    const stakes: StakeToken[] = []

    for (const token of chainTokens) {
      try {
        const totalValueLocked = await etherGlobal.getTokenTvl(token.address)
        const staked = await etherGlobal.getMaxWithdrawAmount(token.address)
        const annualPercentageYield =
          await etherGlobal.computeAnnualPercentageYield(token.address)
        stakes.push({
          vaultName: token.symbol,
          annualPercentageYield,
          totalValueLocked: totalValueLocked.round(4).toString(),
          staked: staked.round(4).toString(),
          tokenAddress: token.address,
        })
      } catch (e) {
        console.error(e)
      }
    }
    return stakes
  },
)
