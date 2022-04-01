/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { IPosition, ISearchParams, TransactionType } from '../types'
import { useAddTransaction, usePositions } from '../state/hooks'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { TableCell } from '../shared/table/cells'
import { Txt } from '../shared/Txt'
import { etherGlobal } from '../api/ether'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../shared/hooks/useSearch'
import { useState } from 'react'

/* eslint-disable */
const cleanDeep = require('clean-deep')
/* eslint-enable */

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const DashboardPage = () => {
  const navigate = useNavigate()
  const addTx = useAddTransaction()

  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open')
  const allPositions = usePositions()
  const [searchParams, { setPage }] = useSearch(initialSearchParams)

  const positions = allPositions.filter((p) => p.status === activeTab)

  const closePosition = async (position: IPosition) => {
    const tx = (await etherGlobal.marginTrading.closePosition(
      position.positionId,
    ))!
    addTx(TransactionType.MTS_CLOSE_POSITION, tx.hash!, {
      positionId: position.positionId,
      spentToken: position.spentToken.symbol,
      obtainedToken: position.obtainedToken.symbol,
    })
  }
  //     //     calculatedActivePositions.push({
  //     //       profit: {
  //     //         currencyValue: profitsAndLosses![0],
  //     //         percentageValue: profitsAndLosses![1],
  //     //       },
  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Dashboard</Txt.Heading1>
          <div tw='flex flex-row justify-center items-center gap-3 self-start mb-4 ml-4'>
            <Txt.Body1Regular>View:</Txt.Body1Regular>
            <Button
              text='Active'
              action={activeTab === 'open'}
              bold={activeTab === 'open'}
              onClick={() => setActiveTab('open')}
            />
            <Button
              text='Closed'
              action={activeTab === 'closed'}
              bold={activeTab === 'closed'}
              onClick={() => setActiveTab('closed')}
            />
          </div>
          <CustomTable
            onActiveRowChange={(row) => navigate(`/position/${row.positionId}`)}
            activeRow={undefined}
            hover
            loading={false}
            maxPage={
              positions.length > 0 ? positions.length / searchParams.size : 1
            }
            currentPage={searchParams.page}
            setPage={setPage}
            pageSize={searchParams.size}
            data={positions}
            mobileColumns={[
              {
                Header: 'TokenPair',
                // @ts-ignore
                accessor: 'tokenPair',
                align: 'left',
                cell: (p) => (
                  <TableCell.Text
                    value={`${p.spentToken.symbol}/${p.obtainedToken.symbol}`}
                  />
                ),
              },
              {
                Header: 'Position',
                // @ts-ignore
                accessor: 'position',
                align: 'center',
                cell: (p) => {
                  const tokenPair =
                    p.type === 'short'
                      ? `${p.spentToken.symbol}/${p.obtainedToken.symbol}`
                      : `${p.obtainedToken.symbol}/${p.spentToken.symbol}`
                  return (
                    <TableCell.Text
                      value={`${tokenPair} ${p.leverage}x ${p.type}`}
                    />
                  )
                },
              },
            ]}
            columns={cleanDeep([
              {
                Header: 'TokenPair',
                // @ts-ignore
                accessor: 'tokenPair',
                align: 'left',
                cell: (p: IPosition) => (
                  <TableCell.Text
                    value={`${p.spentToken.symbol}/${p.obtainedToken.symbol}`}
                  />
                ),
              },
              {
                Header: 'Position',
                // @ts-ignore
                accessor: 'position',
                align: 'center',
                cell: (p: IPosition) => {
                  const tokenPair =
                    p.type === 'short'
                      ? `${p.spentToken.symbol}/${p.obtainedToken.symbol}`
                      : `${p.obtainedToken.symbol}/${p.spentToken.symbol}`
                  return (
                    <TableCell.Text
                      value={`${tokenPair} ${p.leverage}x ${p.type}`}
                    />
                  )
                },
              },

              // {
              //   Header: 'Profit',
              //   accessor: 'profit',
              //   align: 'right',
              //   cell: (l) => (
              //     <TableCell.Profit
              //       currencyValue={l.profit.currencyValue}
              //       percentageValue={l.profit.percentageValue}
              //     />
              //   ),
              // },
              {
                Header: 'Trend',
                // @ts-ignore
                accessor: 'trend',
                align: 'center',
                cell: () => <TableCell.Text value={'placeholder'} />,
              },
              activeTab === 'open'
                ? {
                    Header: '',
                    // @ts-ignore
                    accessor: 'action',
                    align: 'right',
                    cell: (p: IPosition) => (
                      <TableCell.Button
                        onClick={() => closePosition(p)}
                        text='Close'
                      />
                    ),
                  }
                : null,
            ])}
          />
        </div>
      </div>
    </ContentContainer>
  )
}
