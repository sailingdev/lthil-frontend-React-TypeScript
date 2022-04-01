import { BigNumber, ethers } from 'ethers'

import { tokens } from '../assets/tokenlist.json'

export class Utils {
  static zero = Utils.parseUnits(0)
  static parseTokenUnits(
    amount: string,
    tokenAddress: string,
  ): ethers.BigNumber | undefined {
    try {
      const token = tokens.find((tkn) => tkn.address === tokenAddress)
      if (!token) {
        throw new Error('token not found!')
      }
      const decimals = token.decimals

      return ethers.utils.parseUnits(amount, decimals)
    } catch (error) {
      console.error(error)
    }
  }

  static formatTokenUnits(
    amount: string,
    tokenAddress: string,
  ): string | undefined {
    try {
      const token = tokens.find((tkn) => tkn.address === tokenAddress)
      if (!token) {
        throw new Error('token not found!')
      }
      const decimals = token.decimals

      return ethers.utils.formatUnits(amount, decimals)
    } catch (error) {
      console.error(error)
    }
  }
  static parseUnits(value: string | BigNumber | number): BigNumber {
    if (typeof value === 'string') {
      return ethers.utils.parseUnits(value)
    } else if (typeof value === 'number') {
      return ethers.utils.parseUnits(value.toString())
    } else if (value instanceof BigNumber) {
      const str = value.toString()
      return ethers.utils.parseUnits(str)
    } else {
      throw new Error('Unsupported type value')
    }
  }
  static formatUnits(value: BigNumber): string {
    return ethers.utils.formatUnits(value)
  }
}
