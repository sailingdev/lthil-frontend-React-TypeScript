/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useState } from 'react'

import { ContentContainer } from '../shared/ContentContainer'
import { Txt } from '../shared/Txt'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { InputField } from '../shared/InputField'
import { useSearch } from '../shared/hooks/useSearch'
import { TableCell } from '../shared/table/cells'
import { MagnifyingGlass } from 'phosphor-react'

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
  const [searchParams, { setSearchParams, setOrder, setOrderField, setPage }] =
    useSearch(initialSearchParams)

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-9/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Stake</Txt.Heading1>
          <InputField
            tw='width[500px] self-start mb-4'
            placeholder='Search positions...'
            value={search}
            onChange={(value) => setSearch(value)}
            renderRight={<MagnifyingGlass tw='text-secondary' />}
          />
        </div>
      </div>
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
    </ContentContainer>
  )
}
