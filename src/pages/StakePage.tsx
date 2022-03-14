/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useEffect } from 'react'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { InputField } from '../shared/InputField'
import { MagnifyingGlass } from 'phosphor-react'
import { TableCell } from '../shared/table/cells'
import { Txt } from '../shared/Txt'
import { useSearch } from '../shared/hooks/useSearch'
import { useState } from 'react'
import { etherGlobal } from '../ether'
import { useInitStakeTokens, useStakeTokens } from '../state/hooks'
import { useAsync } from 'react-use'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { DepositWithdraw } from '../shared/DepositWithdraw'
import { useIsConnected } from '../shared/hooks/useIsConnected'

const tableData: any[] = []

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const StakePage = () => {
  const [search, setSearch] = useState('')
  const [searchParams, { setPage }] = useSearch(initialSearchParams)
  // const initStakeTokens = useInitStakeTokens()
  // const tt = useInitStakeTable()
  // useInitStakeTokens()
  const initUserStakes = useInitStakeTokens()
  const stakeTokens = useStakeTokens()

  useEffect(() => {
    initUserStakes()
    console.log('Stake tokens: ', stakeTokens)
    // tableData = stakeTokens

    console.log('tableData', tableData)
  }, [useIsConnected()])

  const [activeRow, setActiveRow] = useState<any | undefined>()

  const onRowClick = async (row: any) => {
    if (activeRow == row) {
      setActiveRow(undefined)
    } else {
      setActiveRow(row)
    }
  }

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
          {stakeTokens && stakeTokens.length > 0 ? (
            <CustomTable
              activeRow={activeRow}
              onActiveRowChange={onRowClick}
              renderExpanded={<DepositWithdraw />}
              loading={false}
              maxPage={
                stakeTokens.length > 0
                  ? stakeTokens.length / searchParams.size
                  : 1
              }
              currentPage={searchParams.page}
              setPage={setPage}
              pageSize={searchParams.size}
              data={stakeTokens.length > 0 ? stakeTokens : []}
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
                  align: 'center',
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
                  align: 'right',
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
                  align: 'right',
                  cell: (l) => (
                    <TableCell.Currency
                      value={l.owned.currencyValue}
                      format={l.owned.format}
                    />
                  ),
                },
                {
                  Header: '',
                  accessor: 'icons',
                  align: 'right',
                  cell: (l) => <TableCell.TokenIcons />,
                },
              ]}
            />
          ) : (
            'loading or wallet not connected'
          )}
        </div>
      </div>
    </ContentContainer>
  )
}
