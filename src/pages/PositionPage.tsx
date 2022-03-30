/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { BasicChart } from '../shared/charts/BasicChart'
import { ClosePosition } from '../shared/ClosePosition'
import { CollateralCard } from '../shared/CollateralCard'
import { ContentContainer } from '../shared/ContentContainer'
import { Liquidation } from '../shared/Liquidation'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { TabButton } from '../shared/TabButton'
import { TradingChart } from '../shared/charts/TradingChart'
import { Txt } from '../shared/Txt'
import { useEffect, useState } from 'react'
import { usePosition } from '../state/hooks'
import { useParams } from 'react-router-dom'
import { etherGlobal } from '../api/ether'
import { useAddTransaction, useInitPositions } from '../state/hooks'
import { TokenDetails, TransactionType } from '../types'
import { BigNumber } from 'ethers'
import { useAsync } from 'react-use'

export const PositionPage = () => {
  const { positionId } = useParams()
  const position = usePosition(positionId)
  const addTx = useAddTransaction()

  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')
  const [spentToken, setSpentToken] = useState<TokenDetails | undefined>(
    undefined,
  )
  const [obtainedToken, setObtainedToken] = useState<TokenDetails | undefined>(
    undefined,
  )
  const [collateral, setCollateral] = useState<string | undefined>('')
  const [distanceFromLiquidation, setDistanceFromLiquidation] = useState<
    number | undefined
  >(undefined)
  const [liquidationInput, setLiquidationInput] = useState<string>('')
  const [liquidationToken1, setLiquidationToken1] = useState('ETH')
  const [liquidationToken2, setLiquidationToken2] = useState('USDC')
  const [liquidationPrice, setLiquidationPrice] = useState<number | undefined>(
    undefined,
  )
  const [leverage, setLeverage] = useState<BigNumber | undefined>(undefined)
  const [currentPrice, setCurrentPrice] = useState<BigNumber | undefined>(
    undefined,
  )
  const [openPrice, setOpenPrice] = useState<BigNumber | undefined>(undefined)
  const [positionType, setPositionType] = useState<string | undefined>(
    undefined,
  )
  const [positionDesription, setPositionDescription] = useState<
    string | undefined
  >(undefined)

  useAsync(async () => {
    if (position) {
      setSpentToken(etherGlobal.getTokenData(position!.spentToken))
      setObtainedToken(etherGlobal.getTokenData(position!.obtainedToken))
      setOpenPrice(etherGlobal.getPositionOpenPrice(position!))
      setCurrentPrice(await etherGlobal.getPositionCurrentPrice(position!))
      setLeverage(etherGlobal.getPositionLeverage(position!))
      setPositionType(etherGlobal.getPositionType(position))
      setPositionDescription(etherGlobal.getPositionShortDescription(position!))
    }
  }, [position])

  useEffect(() => {
    if (position && openPrice && leverage) {
      setLiquidationPrice(
        etherGlobal.getPositionLiquidationPrice(
          position!,
          openPrice as BigNumber,
          leverage as BigNumber,
        ),
      )
    }

    if (spentToken) {
      setCollateral(
        etherGlobal.formatUnits(
          position!.collateralReceived!.toString(),
          spentToken!.address,
        ),
      )
    }
  }, [position, openPrice, leverage, spentToken])

  useEffect(() => {
    if (currentPrice && liquidationPrice) {
      setDistanceFromLiquidation(
        etherGlobal.computeDistanceFromLiquidation(
          position!,
          liquidationPrice!,
          currentPrice!.toNumber(),
        ),
      )
    }
  }, [currentPrice, liquidationPrice])

  const liquidationAction = () => {
    console.log('liquidation action clicked.')
  }

  const closePosition = async (positionId: string) => {
    const closePosition = await etherGlobal.MarginTradingClosePosition(
      positionId,
    )
    const { spentToken, obtainedToken } =
      await etherGlobal.getMarginTradingPositionById(positionId)
    addTx(TransactionType.MTS_CLOSE_POSITION, closePosition.hash!, {
      positionId: positionId,
      spentToken: spentToken,
      obtainedToken: obtainedToken,
    })
  }

  const timestampToDate = (timestamp: string) => {
    const dateObject = new Date(Number(timestamp) * 1000)
    return dateObject.toLocaleDateString()
  }

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Margin Trading Strategy</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              <PositionDetailsCard
                createdAt={timestampToDate(position!.createdAt.toString())}
                collateral={collateral!}
                openPrice={openPrice ? openPrice!.toString() : ''}
                currentPrice={currentPrice ? currentPrice!.toString() : ''}
                liquidationPrice={
                  liquidationPrice ? liquidationPrice!.toString() : ''
                }
                leverage={leverage?.toString()}
                spentTokenSymbol={spentToken?.symbol}
                obtainedTokenSymbol={obtainedToken?.symbol}
                positionType={positionType}
                distanceFromLiquidation={distanceFromLiquidation?.toString()}
                positionDescription={positionDesription}
              />
              <CollateralCard />
              <Liquidation
                liquidationToken1={liquidationToken1}
                liquidationToken2={liquidationToken2}
                liquidationPrice={liquidationPrice ? liquidationPrice : 0}
                inputValue={liquidationInput}
                inputOnChange={(value) => setLiquidationInput(value)}
                onClick={liquidationAction}
              />
              <ClosePosition
                token='USDC'
                value={3000}
                onClick={() => closePosition(positionId!)}
              />
            </div>
            <div tw='w-full desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'>
              <div tw='w-full flex flex-row justify-between pb-5 '>
                <Txt.Heading2>{`${obtainedToken?.symbol}/${spentToken?.symbol}`}</Txt.Heading2>
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
                    tokenSymbol={`${obtainedToken?.symbol}${spentToken?.symbol}`}
                  />
                ) : (
                  <TradingChart
                    tokenSymbol={`${obtainedToken?.symbol}${spentToken?.symbol}`}
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
