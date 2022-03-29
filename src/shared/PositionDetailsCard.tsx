/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { InfoItem } from './InfoItem'
import { Txt } from './Txt'

// TODO: work in progress
interface IPositionDetailsCard {
  spentTokenSymbol?: string
  obtainedTokenSymbol?: string
  leverage?: number
  positionType?: string
  openPrice?: string
  currentPrice: string
  liquidationPrice: string
  collateral: string
  createdAt: string
}

export const PositionDetailsCard = (props: IPositionDetailsCard) => {
  const { createdAt, collateral, openPrice, currentPrice, liquidationPrice } =
    props
  return (
    <div tw='flex flex-col justify-between items-center w-full rounded-xl p-5 bg-primary-100'>
      <Txt.Heading2>Position details</Txt.Heading2>
      <div tw='flex flex-col justify-between w-full px-2 mt-6 gap-2'>
        <InfoItem label='Position' details={'ETH 2x Long'} value={'2.00'} />
        <InfoItem label='Open price' details={'USDC'} value={openPrice!} />
        <InfoItem label='Current price' details={'USDC'} value={currentPrice} />
        <InfoItem
          label='Liq. price'
          details={'USDC'}
          value={liquidationPrice}
        />
        <InfoItem label='Collateral' details={'ETH'} value={collateral} />
        <InfoItem
          label='Distance from liquidation'
          details={'ETH'}
          value={'+0.02'}
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
