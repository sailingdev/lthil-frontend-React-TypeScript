/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { InfoItem } from './InfoItem'
import { Txt } from './Txt'

export const PositionDetailsCard = () => {
  return (
    <div tw='flex flex-col justify-between items-center w-full rounded-xl p-5 bg-primary-100'>
      <Txt.Heading2>Position details</Txt.Heading2>
      <div tw='flex flex-col justify-between w-full px-2 mt-6 gap-2'>
        <InfoItem label='Position' details={'ETH 2x Long'} value={'2.00'} />
        <InfoItem label='Open price' details={'USDC'} value={'3.129'} />
        <InfoItem label='Current price' details={'USDC'} value={'3.129'} />
        <InfoItem label='Liq. price' details={'USDC'} value={'3.017'} />
        <InfoItem label='Collateral' details={'ETH'} value={'1.00'} />
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
        <InfoItem label='Opened' value={'10/01/2021'} />
      </div>
    </div>
  )
}
