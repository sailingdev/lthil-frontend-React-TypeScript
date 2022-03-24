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

    const parsedEvents: IParsedPositionWasOpenedEvent[] = events.map((e) => {
      return etherGlobal.parsePositionWasOpenedEvent(
        e as unknown as IPositionWasOpenedEvent,
      )
    })
    return parsedEvents
  },
)
