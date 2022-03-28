/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { useAddTransaction, useInitPositions } from '../state/hooks'
import { useEffect, useState } from 'react'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { TableCell } from '../shared/table/cells'
import { TransactionType } from '../types'
import { Txt } from '../shared/Txt'
import { etherGlobal } from '../api/ether'
import { useIsConnected } from '../shared/hooks/useIsConnected'
import { usePositions } from '../shared/hooks/usePositions'
import { useSearch } from '../shared/hooks/useSearch'

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const DashboardPage = () => {
  const isConnected = useIsConnected()
  const initActivePositions = useInitPositions()

  const addTx = useAddTransaction()

  useEffect(() => {
    if (isConnected) {
      initActivePositions()
    }
  }, [isConnected])

  const positions = usePositions()

  const [searchParams, { setPage }] = useSearch(initialSearchParams)
  const [activeTab, setActiveTab] = useState('active')

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
        <div tw='w-full desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Dashboard</Txt.Heading1>
          <div tw='flex flex-row justify-center items-center gap-3 self-start mb-4 ml-4'>
            <Txt.Body1Regular>View:</Txt.Body1Regular>
            <Button
              text='Active'
              action={activeTab === 'active'}
              bold={activeTab === 'active'}
              onClick={() => setActiveTab('active')}
            />
            <Button
              text='Closed'
              action={activeTab === 'closed'}
              bold={activeTab === 'closed'}
              onClick={() => setActiveTab('closed')}
            />
          </div>
          <CustomTable
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
                accessor: 'tokenPair',
                align: 'left',
                cell: (l) => <TableCell.Text value={l.tokenPair} />,
              },
              {
                Header: 'Position',
                accessor: 'position',
                align: 'left',
                cell: (l) => <TableCell.Text value={l.position} />,
              },
              {
                Header: 'Profit',
                accessor: 'profit',
                align: 'left',
                cell: (l) => (
                  <TableCell.Profit
                    currencyValue={l.profit.currencyValue}
                    percentageValue={l.profit.percentageValue}
                  />
                ),
              },
            ]}
            columns={[
              {
                Header: 'TokenPair',
                accessor: 'tokenPair',
                align: 'left',
                cell: (l) => <TableCell.Text value={l.tokenPair} />,
              },
              {
                Header: 'Position',
                accessor: 'position',
                align: 'center',
                cell: (l) => <TableCell.Text value={l.position} />,
              },
              {
                Header: 'Profit',
                accessor: 'profit',
                align: 'right',
                cell: (l) => (
                  <TableCell.Profit
                    currencyValue={l.profit.currencyValue}
                    percentageValue={l.profit.percentageValue}
                  />
                ),
              },
              {
                Header: 'Trend',
                accessor: 'trend',
                align: 'center',
                cell: (l) => <TableCell.Text value={l.trend} />,
              },
              {
                Header: '',
                // @ts-ignore
                accessor: 'action',
                align: 'right',
                cell: (l) => (
                  <TableCell.ClosePosition
                    onClick={() => closePosition(l.positionId)}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </ContentContainer>
  )
}
