import { createAsyncThunk } from '@reduxjs/toolkit'
import { etherGlobal } from '../../ether'
import { BigNumber, utils } from 'ethers'

export const initializePositionsData = createAsyncThunk(
  'marginTrading/initializePositionsData',
  async () => {
    const MarginTradingStrategy = etherGlobal.getMarginTradingStrategyContract()

    const openedPositions = await MarginTradingStrategy.queryFilter(
      MarginTradingStrategy.filters.PositionWasOpened(),
      '0x1',
      'latest',
    )

    // Event data:
    // uint256 indexed id,
    // address indexed owner,
    // address owedToken,
    // address heldToken,
    // address collateralToken,
    // uint256 collateral,
    // uint256 principal,
    // uint256 allowance,
    // uint256 fees,
    // uint256 createdAt

    return [
      {
        tokenPair: 'ETH/ETH',
        position: 'ETH 2x Long',
        profit: {
          currencyValue: 1240,
          percentageValue: 15.6,
          format: 'en-US',
        },
        trend: 'placeholder',
      },
      {
        tokenPair: 'ETH/ETH',
        position: 'ETH 2x Long',
        profit: {
          currencyValue: 1240,
          percentageValue: 15.6,
          format: 'en-US',
        },
        trend: 'placeholder',
      },
    ]
  },
)
