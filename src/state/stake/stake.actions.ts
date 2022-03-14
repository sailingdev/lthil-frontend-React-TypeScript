import { createAsyncThunk } from '@reduxjs/toolkit'
import tokenList from '../../assets/tokenlist.json'
import { etherGlobal } from '../../ether'
import { useAsync } from 'react-use'

export const initializeUserStakes = createAsyncThunk(
  'stake/initializeUserStakes',
  async () => {
    // TODO - CHAIN ID FILTER IS HARDCODED TO 4
    const stakeList: any = []

    const filteredList = tokenList.tokens.filter((token) => token.chainId == 4)

    for (const token of filteredList) {
      stakeList.push({
        vaultName: token.name,
        annualPositionYield: {
          value: 1, // TODO: Calculate this
          format: 'en-US',
        },
        totalValueLocked: {
          currencyValue: await etherGlobal.getTokenTvl(token.address),
          format: 'en-US',
        },
        owned: {
          currencyValue: await etherGlobal.getMaxWithdrawAmount(token.address),
          format: 'en-US',
        },
        // TODO: figure out what data to put here
        icons: {},
      })
    }
    return stakeList
  },
)
