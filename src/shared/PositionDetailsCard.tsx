import 'twin.macro'

import AdvancedSectionImg from '../assets/images/advancedSectionImage.png'
import { FixedNumber } from 'ethers'
/** @jsxImportSource @emotion/react */
import { IPosition } from '../types'
import { InfoItem } from './InfoItem'
import { Txt } from './Txt'
import { formatDate } from '../utils'
import { usePositionProfit } from './hooks/usePositionProfit'

interface IPositionDetailsCard {
  position: IPosition
}

export const PositionDetailsCard = ({ position }: IPositionDetailsCard) => {
  const profit = usePositionProfit()
  const { spentToken, obtainedToken, collateralToken } = position
  const tokenPair =
    position.type === 'short'
      ? `${spentToken.symbol}/${obtainedToken.symbol}`
      : `${obtainedToken.symbol}/${spentToken.symbol}`
  return (
    <div tw='flex flex-col justify-between items-center w-full rounded-xl p-5 bg-primary-100'>
      <Txt.Heading2>Position details</Txt.Heading2>
      <div tw='flex flex-col justify-between w-full px-2 mt-6 gap-2'>
        <InfoItem
          label='Position'
          details={`${tokenPair} ${FixedNumber.from(position.leverage)
            .round(4)
            .toString()}x ${position.type}`}
          value={'2.00'}
        />
        <InfoItem
          label='Open price'
          details={collateralToken.symbol}
          value={FixedNumber.from(position.openPrice).round(4).toString()}
        />
        {/* <InfoItem
          label='Current price'
          details={collateralToken.symbol}
          value={currentPrice}
        /> */}
        <InfoItem
          label='Liq. price'
          details={collateralToken.symbol}
          value={FixedNumber.from(position.liquidationPrice)
            .round(4)
            .toString()}
        />
        <InfoItem
          label='Collateral'
          details={collateralToken.symbol}
          value={FixedNumber.from(position.collateralReceived)
            .round(4)
            .toString()}
        />
        {/* <InfoItem
          label='Distance from liquidation'
          details={'%'}
          value={distanceFromLiquidation}
        /> */}
        {profit && (
          <InfoItem
            label='Profit'
            value={`${profit[0]}(${profit[1]})`}
            valueColor={profit[0].isNegative() ? 'green' : 'red'}
          />
        )}
        <InfoItem
          label='Opened'
          value={formatDate(new Date(position.createdAt * 1000))}
        />
        <img
          tw='w-full my-5'
          src={AdvancedSectionImg}
          alt='advancedSectionPlaceholder'
        />
      </div>
    </div>
  )
}
