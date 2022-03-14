import 'twin.macro'

import { ISearchParams, StakeToken } from '../types'
import { useEffect, useState } from 'react'
import { useInitStakeTokens, useStakeTokens } from '../state/hooks'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { DepositWithdraw } from '../shared/DepositWithdraw'
import { InputField } from '../shared/InputField'
/** @jsxImportSource @emotion/react */
import { MagnifyingGlass } from 'phosphor-react'
import { TableCell } from '../shared/table/cells'
import { Txt } from '../shared/Txt'
import { etherGlobal } from '../ether'
import { useIsConnected } from '../shared/hooks/useIsConnected'
import { useSearch } from '../shared/hooks/useSearch'

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}

export const StakePage = () => {
  const [search, setSearch] = useState('')
  const [searchParams, { setPage }] = useSearch(initialSearchParams)
  const initUserStakes = useInitStakeTokens()
  const stakeTokens = useStakeTokens()
  const [activeRow, setActiveRow] = useState<any | undefined>()

  const isConnected = useIsConnected()

  useEffect(() => {
    if (isConnected) {
      initUserStakes()
    }
  }, [isConnected])

  const onRowClick = async (row: any) => {
    console.log(
      await etherGlobal
        .getVaultContract()
        // @ts-ignore
        .balance('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE'),
    )
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
              data={(stakeTokens ?? []) as StakeToken[]}
              mobileColumns={[
                {
                  Header: 'Vault',
                  accessor: 'vaultName',
                  cell: (l: StakeToken) => (
                    <TableCell.Text value={l.vaultName} />
                  ),
                },
                {
                  Header: 'APY',
                  accessor: 'annualPositionYield',
                  cell: (l: StakeToken) => (
                    <TableCell.Percentage value={l.annualPositionYield} />
                  ),
                },
                {
                  Header: 'TVL',
                  accessor: 'totalValueLocked',
                  cell: (l: StakeToken) => (
                    <TableCell.Currency value={l.totalValueLocked} />
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
                  cell: (l: StakeToken) => (
                    <TableCell.Percentage value={l.annualPositionYield} />
                  ),
                },
                {
                  Header: 'Total value locked',
                  accessor: 'totalValueLocked',
                  align: 'right',
                  cell: (l: StakeToken) => (
                    <TableCell.Currency value={l.totalValueLocked} />
                  ),
                },
                {
                  Header: 'Owned',
                  accessor: 'owned',
                  align: 'right',
                  cell: (l: StakeToken) => (
                    <TableCell.Currency value={l.owned} />
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
