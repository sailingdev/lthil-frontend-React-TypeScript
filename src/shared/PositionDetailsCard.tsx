import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { BigNumber } from 'ethers'
import { IPosition } from '../types'
import { InfoItem } from './InfoItem'
import { Txt } from './Txt'
import { usePositionProfit } from './hooks/usePositionProfit'

interface IPositionDetailsCard {
  position: IPosition
}

// createdAt={formatDate(new Date(position.createdAt * 1000))}
//                 collateral={Ether.utils.formatTokenUnits(
//                   position.collateralReceived,
//                   collateralToken.address,
//                 )}
//                 openPrice={Ether.utils.formatTokenUnits(
//                   position.openPrice.toString(),
//                   collateralToken.address,
//                 )}
//                 // currentPrice={
//                 //   currentPrice
//                 //     ? Ether.formatUnits(
//                 //         currentPrice!.toString(),
//                 //         collateralToken.address,
//                 //       )
//                 //     : ''
//                 // }
//                 currentPrice=''
//                 liquidationPrice={Ether.utils.formatTokenUnits(
//                   position.liquidationPrice,
//                   collateralToken.address,
//                 )}
//                 collateralToken={collateralToken.symbol}
//                 distanceFromLiquidation={distanceFromLiquidation?.toString()}
//                 positionDescription={description}
//                 profitsAndLosses={profitsAndLosses}

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
  } = props

  const profit = usePositionProfit()
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
          details={'%'}
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
