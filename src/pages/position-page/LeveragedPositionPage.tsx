import 'twin.macro'

import { MtsClosePositionMeta, TransactionType } from '../../types'
import { useAddTransaction, usePosition } from '../../state/hooks'

import { ChartCard } from '../../shared/charts/ChartCard'
import { ClosePosition } from '../../shared/ClosePosition'
import { ContentContainer } from '../../shared/ContentContainer'
import { PositionDetailsCard } from '../../shared/PositionDetailsCard'
import { TopUp } from '../../shared/TopUp'
import { Txt } from '../../shared/Txt'
import { etherGlobal } from '../../api/ether'
import { useParams } from 'react-router-dom'
/** @jsxImportSource @emotion/react */
import { useState } from 'react'

export const LeveragedPositionPage = () => {
  const { positionId } = useParams<{ positionId: string }>()
  const position = usePosition(positionId!)
  const addTx = useAddTransaction<MtsClosePositionMeta>()

  const [liquidationInput, setLiquidationInput] = useState<string>('')

  if (!position) {
    return null
  }

  const { obtainedToken, spentToken, collateralToken } = position

  const closePosition = async () => {
    const closePosition = await etherGlobal.position
      .getMarginStrategy()
      .closePosition(position)
    addTx(TransactionType.MTS_CLOSE_POSITION, closePosition.hash!, {
      positionId: position.positionId,
      spentToken: position.spentToken.address,
      obtainedToken: position.obtainedToken.address,
    })
  }

  const editPosition = async (
    newCollateral: string,
    collateralToken: string,
  ) => {
    const editPosition = await etherGlobal.position
      .getMarginStrategy()
      .editPosition(position.positionId, newCollateral, collateralToken)
    addTx(TransactionType.MTS_EDIT_POSTITION, editPosition.hash!, {
      positionId: position.positionId,
      spentToken: position.spentToken.address,
      obtainedToken: position.obtainedToken.address,
    })
  }

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Margin Trading Strategy</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow w-full desktop:w-4/12'>
              <PositionDetailsCard position={position} />
              {position.status === 'open' && (
                <>
                  <TopUp
                    inputValue={liquidationInput}
                    inputOnChange={(value) => setLiquidationInput(value)}
                    position={position}
                    onClick={() =>
                      editPosition(liquidationInput, collateralToken.address)
                    }
                  />
                  {/* <CollateralCard />
                  <Liquidation
                    // liquidationToken1={liquidationToken1}
                    // liquidationToken2={liquidationToken2}
                    liquidationToken1={spentToken.symbol}
                    liquidationToken2={obtainedToken.symbol}
                    // liquidationPrice={Ether.utils.formatTokenUnits(
                    //   position.liquidationPrice,
                    //   collateralToken.address,
                    // )}
                    liquidationPrice='TODOTODOTOD'
                    inputValue={liquidationInput}
                    inputOnChange={(value) => setLiquidationInput(value)}
                    onClick={() =>
                      editPosition(liquidationInput, collateralToken.address)
                    }
                    // tokenSymbol={collateralToken.symbol as string}
                  /> */}
                  <ClosePosition
                    token={collateralToken.symbol as string}
                    value={3000}
                    onClick={closePosition}
                  />
                </>
              )}
            </div>
            <ChartCard
              firstToken={obtainedToken}
              secondToken={spentToken}
              disableTrading={false}
            />
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
