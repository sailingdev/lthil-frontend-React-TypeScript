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
    const marginTradingStrategy =
      ContractFactory.getMarginTradingStrategyContract(
        await etherGlobal.ensureSigner(),
      )
    const openEvents = await marginTradingStrategy.queryFilter(
      marginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )
    const closedEvents = await marginTradingStrategy.queryFilter(
      marginTradingStrategy.filters.PositionWasClosed(),
      '0x1',
      'latest',
    )

    // Filtering out closed positions from opened positions
    const events = openEvents.filter((el) => {
      if (
        closedEvents.every(
          // @ts-ignore
          (e) => e.args[0].toHexString() != el.args[0].toHexString(),
        )
      ) {
        return el
      }
    })

    const userAddress = await etherGlobal.getAccountAddress()

    // Prasing open positions and filtering out ones not created by user
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
