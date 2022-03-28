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
import { useState } from 'react'
import { usePosition } from '../state/hooks'
import { useParams } from 'react-router-dom'
import { etherGlobal } from '../api/ether'
import { useAddTransaction, useInitPositions } from '../state/hooks'
import { TransactionType } from '../types'

export const PositionPage = () => {
  const { positionId } = useParams()
  const position = usePosition(positionId)
  const addTx = useAddTransaction()

  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')
  const [liquidationInput, setLiquidationInput] = useState<string>('')
  const [liquidationToken1, setLiquidationToken1] = useState('ETH')
  const [liquidationToken2, setLiquidationToken2] = useState('USDC')
  const [liquidationPrice, setLiquidationPrice] = useState(5000)

  const liquidationAction = () => {
    console.log('liquidation action clicked.')
  }

  const closePosition = async (positionId: string) => {
    const closePosition = await etherGlobal.MarginTradingClosePosition(
      positionId,
    )
    console.log(closePosition)
    const { spentToken, obtainedToken } =
      await etherGlobal.getMarginTradingPositionById(positionId)
    addTx(TransactionType.MTS_CLOSE_POSITION, closePosition.hash!, {
      positionId: positionId,
      spentToken: spentToken,
      obtainedToken: obtainedToken,
    })
  }

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>
            {etherGlobal.getTokenData(position!.spentToken)!.symbol}/
            {etherGlobal.getTokenData(position!.obtainedToken)!.symbol}
          </Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              {/* TOOD: Convert to human readable format */}
              <PositionDetailsCard createdAt={position!.createdAt.toString()} />
              <CollateralCard />
              <Liquidation
                liquidationToken1={liquidationToken1}
                liquidationToken2={liquidationToken2}
                liquidationPrice={liquidationPrice}
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
                <Txt.Heading2>ETH/USDC</Txt.Heading2>
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
                  <BasicChart tokenSymbol='EURUSD' />
                ) : (
                  <TradingChart tokenSymbol='EURUSD' />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
