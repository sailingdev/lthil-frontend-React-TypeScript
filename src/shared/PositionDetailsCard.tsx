/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { InfoItem } from './InfoItem'
import { Txt } from './Txt'

// TODO: work in progress
interface IPositionDetailsCard {
  spentTokenSymbol: string | undefined
  obtainedTokenSymbol: string | undefined
  leverage: string | undefined
  positionType: string | undefined
  openPrice: string | undefined
  currentPrice: string | undefined
  liquidationPrice: string | undefined
  collateral: string | undefined
  createdAt: string | undefined
  distanceFromLiquidation: string | undefined
  positionDescription: string | undefined
}

export const PositionDetailsCard = (props: IPositionDetailsCard) => {
  const {
    createdAt,
    collateral,
    openPrice,
    currentPrice,
    liquidationPrice,
    distanceFromLiquidation,
    leverage,
    positionType,
    spentTokenSymbol,
    obtainedTokenSymbol,
    positionDescription,
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
        <InfoItem label='Open price' details={''} value={openPrice!} />
        <InfoItem label='Current price' details={''} value={currentPrice} />
        <InfoItem label='Liq. price' details={''} value={liquidationPrice} />
        <InfoItem
          label='Collateral'
          details={spentTokenSymbol}
          value={collateral}
        />
        <InfoItem
          label='Distance from liquidation'
          details={spentTokenSymbol}
          value={distanceFromLiquidation}
        />
        <InfoItem
          label='Profit'
          value={'$ +1.240,00 (+15.6%)'}
          valueColor={'green'}
        />
        <InfoItem label='Opened' value={createdAt} />
      </div>
    </div>
  )
}
