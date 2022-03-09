import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../ether'
import { BigNumber, utils } from 'ethers'

export const initializeAccountBalance = createAsyncThunk(
  'network/initializeAccountBalance',
  async () => {
    return utils.formatEther(
      BigNumber.from(parseInt(await etherGlobal.getBalance(), 16).toString()),
    )
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
