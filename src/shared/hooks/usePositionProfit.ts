import { useAsync } from 'react-use'
import { useState } from 'react'
import { FixedNumber } from 'ethers'

import { IPosition } from '../../types'
import { etherGlobal } from '../../api/ether'

export const usePositionProfit = (position?: IPosition) => {
  const [profit, setProfit] = useState<[FixedNumber, FixedNumber] | undefined>()
  useAsync(async () => {
    if (!position) {
      return null
    }
    const value = await etherGlobal.position
      .getMarginStrategy()
      .computePositionProfit(position)
    setProfit(value)
  }, [position])

  return profit
}
