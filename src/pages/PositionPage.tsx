/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { BasicChart } from '../shared/BasicChart'
import { CollateralCard } from '../shared/CollateralCard'
import { ContentContainer } from '../shared/ContentContainer'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { Txt } from '../shared/Txt'
import { Chart } from '../shared/Chart'

export const PositionPage = () => {
  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>ETH/ETH</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              <PositionDetailsCard />
              <CollateralCard />
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
                <Txt.Body2Regular>
                  Placeholder-Liquidation price
                </Txt.Body2Regular>
              </div>
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100'>
                <Txt.Body2Regular>Placeholder-Position value</Txt.Body2Regular>
              </div>
            </div>
            <div tw='w-full desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'>
              <Chart containerId='chart' />
              <div tw='pt-14' id='chart'></div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
