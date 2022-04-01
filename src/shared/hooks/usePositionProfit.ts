/** @jsxImportSource @emotion/react */

import { Ether, etherGlobal } from '../../api/ether'
import {
  useFinalizeTransaction,
  useLatestBlock,
  usePendingTransactions,
} from '../../state/hooks'

import { IPosition } from '../../types'
import { useAsync } from 'react-use'
import { useState } from 'react'

export const usePositionProfit = (position?: IPosition) => {
  const [profit, setProfit] = useState<[number, number] | undefined>()
  useAsync(async () => {
    if (!position) {
      return null
    }
    console.log('start')
    const value = await etherGlobal.marginTrading.computePositionProfit(
      position,
    )
    console.log('end')
    setProfit(value)
  }, [position])

  return profit
}
