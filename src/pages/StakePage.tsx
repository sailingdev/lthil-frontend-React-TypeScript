import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { InputField } from '../shared/InputField'
/** @jsxImportSource @emotion/react */
import { MagnifyingGlass } from 'phosphor-react'
import { TableCell } from '../shared/table/cells'
import { Txt } from '../shared/Txt'
import { useSearch } from '../shared/hooks/useSearch'
import { useState } from 'react'
import { etherGlobal } from '../ether'

const data = [
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
  {
    vaultName: 'ETH',
    annualPositionYield: { value: 17.1, format: 'en-US' },
    totalValueLocked: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
    owned: {
      currencyValue: 83676.12,
      format: 'en-US',
    },
  },
]

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const StakePage = () => {
  const [search, setSearch] = useState('')
  const [searchParams, { setPage }] = useSearch(initialSearchParams)

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Stake</Txt.Heading1>
          <InputField
            tw='desktop:width[500px] desktop:self-start mb-4'
            placeholder='Search tokens...'
            value={search}
            onChange={(value) => setSearch(value)}
            renderRight={<MagnifyingGlass tw='text-secondary' />}
          />
          <CustomTable
            loading={false}
            maxPage={data.length / searchParams.size}
            currentPage={searchParams.page}
            setPage={setPage}
            pageSize={searchParams.size}
            data={data}
            mobileColumns={[
              {
                Header: 'Vault',
                accessor: 'vaultName',
                cell: (l) => <TableCell.Text value={l.vaultName} />,
              },
              {
                Header: 'APY',
                accessor: 'annualPositionYield',
                cell: (l) => (
                  <TableCell.Percentage
                    value={l.annualPositionYield.value}
                    format={l.annualPositionYield.format}
                  />
                ),
              },
              {
                Header: 'TVL',
                accessor: 'totalValueLocked',
                cell: (l) => (
                  <TableCell.Currency
                    value={l.totalValueLocked.currencyValue}
                    format={l.totalValueLocked.format}
                  />
                ),
              },
            ]}
            columns={[
              {
                Header: 'Vault Name',
                accessor: 'vaultName',
                align: 'left',
                cell: (l) => <TableCell.Text value={l.vaultName} />,
              },
              {
                Header: 'Annual Percentage Yield',
                accessor: 'annualPositionYield',
                align: 'left',
                cell: (l) => (
                  <TableCell.Percentage
                    value={l.annualPositionYield.value}
                    format={l.annualPositionYield.format}
                  />
                ),
              },
              {
                Header: 'Total value locked',
                accessor: 'totalValueLocked',
                align: 'left',
                cell: (l) => (
                  <TableCell.Currency
                    value={l.totalValueLocked.currencyValue}
                    format={l.totalValueLocked.format}
                  />
                ),
              },
              {
                Header: 'Owned',
                accessor: 'owned',
                align: 'left',
                cell: (l) => (
                  <TableCell.Currency
                    value={l.owned.currencyValue}
                    format={l.owned.format}
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
