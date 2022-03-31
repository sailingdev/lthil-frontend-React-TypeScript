import {
  IParsedPositionWasOpenedEvent,
  IPositionWasOpenedEvent,
} from '../../types'

import { ContractFactory } from '../../api/contract-factory'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'

export const initializePositions = createAsyncThunk(
  'stake/initializePositions',
  async () => {
    try {
      const marginTradingStrategy =
        ContractFactory.getMarginTradingStrategyContract(
          etherGlobal.getSigner(),
        )

      const userAddress = await etherGlobal.getAccountAddress()

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

      const liquidatedEvents = await marginTradingStrategy.queryFilter(
        marginTradingStrategy.filters.PositionWasLiquidated(),
        '0x1',
        'latest',
      )

      const closedAndLiquidatedEvents = closedEvents.concat(liquidatedEvents)

      // Filtering out closed and liquidated positions from opened positions
      const currentlyOpenEvents = openEvents.filter((el) => {
        if (
          closedAndLiquidatedEvents.every(
            // @ts-ignore
            (e) => e.args[0].toHexString() != el.args[0].toHexString(),
          )
        ) {
          return el
        }
      })

      // Finding PositionWasOpened data for all closed and liquidated positions
      const currentlyClosedAndLiquidatedEvents = closedAndLiquidatedEvents.map(
        (e) => {
          return openEvents.find((el) => {
            return el.args![0].toHexString() === e.args![0].toHexString()
          })
        },
      )

      return {
        active: currentlyOpenEvents.reduce((result, event) => {
          const parsed = etherGlobal.parsePositionWasOpenedEvent(
            event as unknown as IPositionWasOpenedEvent,
          )
          if (parsed.ownerId == userAddress) {
            // @ts-ignore
            result.push(parsed)
          }
          return result
        }, []) as IParsedPositionWasOpenedEvent[],
        closedAndLiquidated: currentlyClosedAndLiquidatedEvents.reduce(
          (result, event) => {
            const parsed = etherGlobal.parsePositionWasOpenedEvent(
              event as unknown as IPositionWasOpenedEvent,
            )
            if (parsed.ownerId == userAddress) {
              // @ts-ignore
              result.push(parsed)
            }
            return result
          },
          [],
        ) as IParsedPositionWasOpenedEvent[],
      }
    } catch (error) {
      console.log(error)
      return { active: [], closedAndLiquidated: [] }
    }
  },
)
