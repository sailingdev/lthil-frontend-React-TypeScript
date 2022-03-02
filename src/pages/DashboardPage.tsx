import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { TableCell } from '../shared/table/cells'
import { Txt } from '../shared/Txt'
import { useSearch } from '../shared/hooks/useSearch'
/** @jsxImportSource @emotion/react */
import { useState } from 'react'

const data = [
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
  {
    tokenPair: 'ETH/ETH',
    position: 'ETH 2x Long',
    profit: {
      currencyValue: 1240,
      percentageValue: 15.6,
      format: 'en-US',
    },
    trend: 'placeholder',
  },
]

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const DashboardPage = () => {
  const [search, setSearch] = useState('')
  const [searchParams, { setSearchParams, setOrder, setOrderField, setPage }] =
    useSearch(initialSearchParams)
  //@ts-ignore

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Dashboard</Txt.Heading1>
          {/* <InputField
            tw='desktop:width[500px] desktop:self-start mb-4'
            placeholder='Search tokens...'
            value={search}
            onChange={(value) => setSearch(value)}
            renderRight={<MagnifyingGlass tw='text-secondary' />}
          /> */}
          <CustomTable
            loading={false}
            maxPage={data.length / searchParams.size}
            currentPage={searchParams.page}
            setPage={setPage}
            pageSize={searchParams.size}
            data={data}
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
                    format={l.profit.format}
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
                    format={l.profit.format}
                  />
                ),
              },
              {
                Header: 'Trend',
                accessor: 'trend',
                align: 'left',
                cell: (l) => <TableCell.Text value={l.trend} />,
              },
            ]}
          />
        </div>
      </div>
      {/* <TokenModal modalIsOpen onChange={() => {}} /> */}
    </ContentContainer>
  )
}
