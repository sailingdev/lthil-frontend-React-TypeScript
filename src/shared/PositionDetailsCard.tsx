/** @jsxImportSource @emotion/react */
import { BigNumber } from 'ethers'
import 'twin.macro'

import { InfoItem } from './InfoItem'
import { Txt } from './Txt'

interface IPositionDetailsCard {
  collateralToken: string | undefined
  openPrice: string | undefined
  currentPrice: string | undefined
  liquidationPrice: string | undefined
  collateral: string | undefined
  createdAt: string | undefined
  distanceFromLiquidation: string | undefined
  positionDescription: string | undefined
  profitsAndLosses: [number, number] | undefined
}

export const PositionDetailsCard = (props: IPositionDetailsCard) => {
  const {
    createdAt,
    collateral,
    openPrice,
    currentPrice,
    liquidationPrice,
    distanceFromLiquidation,
    collateralToken,
    positionDescription,
    profitsAndLosses,
  } = props
  return (
    <div tw='flex flex-col justify-between items-center w-full rounded-xl p-5 bg-primary-100'>
      <Txt.Heading2>Position details</Txt.Heading2>
      <div tw='flex flex-col justify-between w-full px-2 mt-6 gap-2'>
        {/* TODO: Which token goes here? */}
        <InfoItem
          label='Position'
          details={positionDescription}
          value={'2.00'}
        />
        <InfoItem
          label='Open price'
          details={collateralToken}
          value={openPrice!}
        />
        <InfoItem
          label='Current price'
          details={collateralToken}
          value={currentPrice}
        />
        <InfoItem
          label='Liq. price'
          details={collateralToken}
          value={liquidationPrice}
        />
        <InfoItem
          label='Collateral'
          details={collateralToken}
          value={collateral}
        />
        <InfoItem
          label='Distance from liquidation'
          details={collateralToken}
          value={distanceFromLiquidation}
        />
        <InfoItem
          label='Profit'
          value={
            profitsAndLosses
              ? `${profitsAndLosses[0].toString()} (${profitsAndLosses[1].toString()}%)`
              : ''
          }
          valueColor={
            profitsAndLosses && profitsAndLosses![0] > 0 ? 'green' : 'red'
          }
        />
        <InfoItem label='Opened' value={createdAt} />
      </div>
    </div>
  )
}
