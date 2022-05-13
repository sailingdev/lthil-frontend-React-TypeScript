import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { ChartLine, Info, MagnifyingGlass } from 'phosphor-react'
import { ISearchParams, StakeToken } from '../../types'
import { useEffect, useState } from 'react'
import { useInitStakeTokens, useStakeTokens } from '../../state/hooks'

import { Button } from '../../shared/TransactionButton'
import { ContentContainer } from '../../shared/ContentContainer'
import { CustomTable } from '../../shared/table/CustomTable'
import { DepositWithdraw } from './DepositWithdraw'
import { InputField } from '../../shared/InputField'
import { TableCell } from '../../shared/table/cells'
import { Txt } from '../../shared/Txt'
import { useIsConnected } from '../../shared/hooks/useIsConnected'
import { useSearch } from '../../shared/hooks/useSearch'

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'annualPercentageYield',
  order: 'DESC',
  term: '',
}

export const StakePage = () => {
  const [searchParams, { setPage, setTerm, setOrder, setOrderField }] =
    useSearch(initialSearchParams)
  const initUserStakes = useInitStakeTokens()
  const [activeRow, setActiveRow] = useState<any | undefined>()
  const stakeTokens = useStakeTokens(searchParams)
  const isConnected = useIsConnected()

  useEffect(() => {
    if (isConnected) {
      initUserStakes()
    }
  }, [isConnected])

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
          <div tw='flex items-center justify-start flex-col tablet:flex-row w-full mb-2'>
            <InputField
              tw='tablet:w-auto desktop:width[500px] self-start mr-9'
              placeholder='Search tokens...'
              value={searchParams.term}
              onChange={(value) => setTerm(value)}
              renderRight={<MagnifyingGlass tw='text-secondary' />}
            />
            <div tw='flex space-x-1 tablet:space-x-2 items-center'>
              <Txt.Body2Regular>Sort by :</Txt.Body2Regular>
              <Button
                tw='w-auto'
                text='APY - highest'
                action={searchParams.orderField === 'annualPercentageYield'}
                bold={searchParams.orderField === 'annualPercentageYield'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('annualPercentageYield')
                }}
              />
              <Button
                tw='w-auto'
                text='TVL - highest'
                action={searchParams.orderField === 'totalValueLocked'}
                bold={searchParams.orderField === 'totalValueLocked'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('totalValueLocked')
                }}
              />
              <Button
                tw='w-auto'
                text='Staked'
                action={searchParams.orderField === 'staked'}
                bold={searchParams.orderField === 'staked'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('staked')
                }}
              />
            </div>
          </div>
          <CustomTable
            hover
            activeRow={activeRow}
            onActiveRowChange={onRowClick}
            renderExpanded={(row) => {
              return (
                <DepositWithdraw
                  tokenAddress={row.original.tokenAddress ?? undefined}
                  tokenSymbol={row.original.vaultName ?? undefined}
                />
              )
            }}
            loading={false}
            maxPage={
              stakeTokens.length > 0
                ? stakeTokens.length / searchParams.size
                : 1
            }
            currentPage={searchParams.page}
            setPage={setPage}
            pageSize={searchParams.size}
            data={stakeTokens}
            mobileColumns={[
              {
                Header: 'Vault',
                accessor: 'vaultName',
                cell: (l: StakeToken) => <TableCell.Text value={l.vaultName} />,
              },
              {
                Header: 'APY',
                accessor: 'annualPositionYield',
                cell: (l: StakeToken) => (
                  <TableCell.Percentage value={l.annualPercentageYield} />
                ),
              },
              {
                Header: 'TVL',
                accessor: 'totalValueLocked',
                cell: (l: StakeToken) => (
                  <TableCell.Text value={l.totalValueLocked} />
                ),
              },
            ]}
            columns={[
              {
                Header: 'Vault Name',
                accessor: 'vaultName',
                align: 'left',
                cell: (l) => <TableCell.VaultName tokenSymbol={l.vaultName} />,
              },
              {
                Header: 'Annual Percentage Yield',
                accessor: 'annualPositionYield',
                align: 'center',
                cell: (l: StakeToken) => (
                  <TableCell.Percentage value={l.annualPercentageYield} />
                ),
              },
              {
                Header: 'Total value locked',
                accessor: 'totalValueLocked',
                align: 'right',
                cell: (l: StakeToken) => (
                  <TableCell.Text value={l.totalValueLocked} />
                ),
              },
              {
                Header: 'Staked',
                accessor: 'staked',
                align: 'right',
                cell: (l: StakeToken) => <TableCell.Text value={l.staked} />,
              },
              {
                Header: '',
                accessor: 'icons',
                align: 'right',
                cell: (l) => (
                  <div tw='flex flex-row justify-end gap-3'>
                    <ChartLine
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(
                          `https://etherscan.io/token/${l.tokenAddress}`,
                          '_blank',
                        )
                      }}
                      tw='text-font-100 dark:text-font-200 height[16px] width[16px]'
                    />
                    <Info
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(
                          `https://etherscan.io/token/${l.tokenAddress}`,
                          '_blank',
                        )
                      }}
                      tw='text-font-100 dark:text-font-200 height[16px] width[16px]'
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </ContentContainer>
  )
}
