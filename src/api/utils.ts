import { BigNumber, FixedNumber, ethers } from 'ethers'

import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'

export class Utils {
  static zero = FixedNumber.from('0')
  static parseTokenUnits(
    amount: string | number,
    tokenAddress?: string,
  ): ethers.BigNumber {
    const token = tokens.find((tkn) => tkn.address === tokenAddress)
    return ethers.utils.parseUnits(amount.toString(), token?.decimals ?? 18)
  }

  static formatTokenUnits(amount: BigNumber, tokenAddress?: string): string {
    const token = tokens.find((tkn) => tkn.address === tokenAddress)
    return ethers.utils.formatUnits(amount, token?.decimals ?? 18)
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
