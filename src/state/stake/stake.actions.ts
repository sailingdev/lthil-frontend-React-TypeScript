import { createAsyncThunk } from '@reduxjs/toolkit'
import tokenList from '../../assets/tokenlist.json'
import { etherGlobal } from '../../ether'
import { useAsync } from 'react-use'

export const initializeUserStakes = createAsyncThunk(
  'stake/initializeUserStakes',
  async () => {
    // TODO - CHAIN ID FILTER IS HARDCODED TO 4
    const stakeList: any = []

    const filteredList = tokenList.tokens
      .filter((token) => token.chainId == 4)
      .map((token) => ({
        name: token.symbol,
        address: token.address,
        logoURI: token.logoURI,
      }))

    for (const token of filteredList) {
      // @ts-ignore
      const owned = await etherGlobal.getMaxWithdrawAmount(token.address)
      // const tvl = await etherGlobal.getTokenTvl(token.address)
      stakeList.push({
        name: token.name,
        owned: owned,
        // tvl: '0',
        logo: token.logoURI,
      })
    }
    // console.log('stakelist:', stakeList)
    return stakeList
  },
)
