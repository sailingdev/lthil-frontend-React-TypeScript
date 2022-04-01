/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { Ether, etherGlobal } from '../api/ether'

import { BasicChart } from '../shared/charts/BasicChart'
import { ClosePosition } from '../shared/ClosePosition'
import { CollateralCard } from '../shared/CollateralCard'
import { ContentContainer } from '../shared/ContentContainer'
import { Liquidation } from '../shared/Liquidation'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { TabButton } from '../shared/TabButton'
import { TradingChart } from '../shared/charts/TradingChart'
import { TransactionType } from '../types'
import { Txt } from '../shared/Txt'
import { formatDate } from '../utils'
import { useAddTransaction } from '../state/hooks'
import { useParams } from 'react-router-dom'
import { usePosition } from '../state/hooks'
import { useState } from 'react'

export const PositionPage = () => {
  const { positionId } = useParams<{ positionId: string }>()
  const position = usePosition(positionId!)
  const addTx = useAddTransaction()

  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')

  const [distanceFromLiquidation, setDistanceFromLiquidation] = useState<
    number | undefined
  >(undefined)
  const [liquidationInput, setLiquidationInput] = useState<string>('')
  const [profitsAndLosses, setProfitsAndLosses] = useState<
    [number, number] | undefined
  >(undefined)

  if (!position) {
    return null
  }

  const { obtainedToken, spentToken, collateralToken } = position

  // useAsync(async () => {
  //   if (position) {
  //     // setProfitsAndLosses(await etherGlobal.computeProfitsAndLosses(position!))
  //   }
  // }, [position])

  // useEffect(() => {
  //   // if (currentPrice && liquidationPrice) {
  //   //   setDistanceFromLiquidation(
  //   //     etherGlobal.computeDistanceFromLiquidation(
  //   //       position!,
  //   //       liquidationPrice!,
  //   //       currentPrice!.toNumber(),
  //   //     ),
  //   //   )
  //   // }
  // }, [currentPrice, liquidationPrice])

  const liquidationAction = () => {
    console.log('liquidation action clicked.')
  }

  const closePosition = async (positionId: string) => {
    const closePosition = await etherGlobal.marginTrading.closePosition(
      positionId,
    )
    addTx(TransactionType.MTS_CLOSE_POSITION, closePosition.hash!, {
      positionId: positionId,
      spentToken: position.spentToken.symbol,
      obtainedToken: position.obtainedToken.symbol,
    })
  }

  const tokenPair =
    position.type === 'short'
      ? `${spentToken.symbol}/${obtainedToken.symbol}`
      : `${obtainedToken.symbol}/${spentToken.symbol}`
  const description = `${tokenPair} ${position.leverage}x ${position.type}`

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Margin Trading Strategy</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              <PositionDetailsCard
                createdAt={formatDate(new Date(position.createdAt * 1000))}
                collateral={Ether.utils.formatTokenUnits(
                  position.collateralReceived,
                  collateralToken.address,
                )}
                openPrice={Ether.utils.formatTokenUnits(
                  position.openPrice.toString(),
                  collateralToken.address,
                )}
                // currentPrice={
                //   currentPrice
                //     ? Ether.formatUnits(
                //         currentPrice!.toString(),
                //         collateralToken.address,
                //       )
                //     : ''
                // }
                currentPrice=''
                liquidationPrice={Ether.utils.formatTokenUnits(
                  position.liquidationPrice,
                  collateralToken.address,
                )}
                collateralToken={collateralToken.symbol}
                distanceFromLiquidation={distanceFromLiquidation?.toString()}
                positionDescription={description}
                profitsAndLosses={profitsAndLosses}
              />
              {position.status === 'open' && (
                <>
                  <CollateralCard />
                  <Liquidation
                    // liquidationToken1={liquidationToken1}
                    // liquidationToken2={liquidationToken2}
                    liquidationToken1={spentToken.symbol}
                    liquidationToken2={obtainedToken.symbol}
                    liquidationPrice={Ether.utils.formatTokenUnits(
                      position.liquidationPrice,
                      collateralToken.address,
                    )}
                    inputValue={liquidationInput}
                    inputOnChange={(value) => setLiquidationInput(value)}
                    onClick={liquidationAction}
                    tokenSymbol={collateralToken.symbol as string}
                  />
                  <ClosePosition
                    token={collateralToken.symbol as string}
                    value={3000}
                    onClick={() => closePosition(positionId!)}
                  />
                </>
              )}
            </div>
            <div tw='w-full desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'>
              <div tw='w-full flex flex-row justify-between pb-5 '>
                <Txt.Heading2>{`${obtainedToken.symbol}/${spentToken.symbol}`}</Txt.Heading2>
                <div tw='hidden desktop:flex flex-row items-center gap-1'>
                  <Txt.Body2Regular tw='mr-4'>View:</Txt.Body2Regular>
                  <TabButton
                    text='Basic'
                    active={activeChart === 'basic'}
                    onClick={() => setActiveChart('basic')}
                  />
                  <TabButton
                    text='Trading'
                    active={activeChart === 'trading'}
                    onClick={() => setActiveChart('trading')}
                  />
                </div>
              </div>
              <div tw='w-full h-full  flex flex-col'>
                {activeChart === 'basic' ? (
                  <BasicChart
                    tokenSymbol={`${obtainedToken.symbol}${spentToken.symbol}`}
                  />
                ) : (
                  <TradingChart
                    tokenSymbol={`${obtainedToken.symbol}${spentToken.symbol}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
