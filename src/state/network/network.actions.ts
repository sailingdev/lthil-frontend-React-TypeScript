import { BigNumber, utils } from 'ethers'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'

export const initializeAccountBalance = createAsyncThunk(
  'network/initializeAccountBalance',
  async () => {
    return utils.formatEther(BigNumber.from(await etherGlobal.getBalance()))
  },
)
export const updateBlockNumber = createAsyncThunk(
  'network/updateBlockNumber',
  async () => {
    return etherGlobal.getBlockNumber()
  },
)
export const initializeAccountAddress = createAsyncThunk(
  'network/initializeAccountAddress',
  async () => {
    return await etherGlobal.getAccountAddress()
  },
)
