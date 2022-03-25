import {
  IParsedPositionWasOpenedEvent,
  IPositionWasOpenedEvent,
} from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'
import { ContractFactory } from '../../api/contract-factory'

export const initializeActivePositions = createAsyncThunk(
  'stake/initializeActivePositions',
  async () => {
    const MarginTradingStrategy =
      ContractFactory.getMarginTradingStrategyContract(
        await etherGlobal.ensureSigner(),
      )
    const events = await MarginTradingStrategy.queryFilter(
      MarginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )
    const userAddress = await etherGlobal.getAccountAddress()

    return events.reduce((result, event) => {
      const parsed = etherGlobal.parsePositionWasOpenedEvent(
        event as unknown as IPositionWasOpenedEvent,
      )
      if (parsed.ownerId == userAddress) {
        // @ts-ignore
        result.push(parsed)
      }
      return result
    }, []) as IParsedPositionWasOpenedEvent[]
  },
)
