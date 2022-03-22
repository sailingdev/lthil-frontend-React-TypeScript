import { PositionRow, PositionWasOpenedEvent } from '../../types'

import { ContractFactory } from '../../api/contract-factory'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../api/ether'
import tokenList from '../../assets/tokenlist.json'

export const initializePositionsData = createAsyncThunk(
  'marginTrading/initializePositionsData',
  async () => {
    const MarginTradingStrategy =
      ContractFactory.getMarginTradingStrategyContract(etherGlobal.getSigner())
    const positions: PositionRow[] = []

    const openedPositions = await MarginTradingStrategy.queryFilter(
      MarginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )

    console.log(openedPositions)

    const events: PositionWasOpenedEvent[] = [
      {
        id: '1',
        owner: '0x4678820caa137EE5FDcE601E1963a3b487d8F1f4',
        owedToken: '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
        heldToken: '0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b',
        collateralToken: '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
        collateral: '0xde0b6b3a7640000',
        principal: 'hex',
        allowance: 'hex',
        fees: 'hex',
        createdAt: 'hex',
      },
    ]

    events.forEach((e) => {
      const ownedToken = tokenList.tokens.filter(
        (token) => e.owedToken === token.address,
      )[0].symbol
      const heldToken = tokenList.tokens.filter(
        (token) => e.heldToken === token.address,
      )[0].symbol
      positions.push({
        tokenPair: `${ownedToken}/${heldToken}`,
        position: `${ownedToken}/${heldToken}`, // TODO: long/short
        profit: {
          currencyValue: 2,
          percentageValue: 15,
        },
        trend: 'placeholder', // TODO: trend chart
      })
    })

    return positions
  },
)
