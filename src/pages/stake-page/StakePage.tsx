import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { ChartLine, Info, MagnifyingGlass } from 'phosphor-react'
import { ISearchParams, StakeToken } from '../../types'
import { useEffect, useState } from 'react'
import { useInitStakeTokens, useStakeTokens } from '../../state/hooks'

import { Button } from '../../shared/Button'
import { ContentContainer } from '../../shared/ContentContainer'
import { CustomTable } from '../../shared/table/CustomTable'
import { DepositWithdraw } from './DepositWithdraw'
import { InputField } from '../../shared/InputField'
import { TabButton } from '../../shared/TabButton'
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
          <div tw='flex items-center justify-start flex-row w-full'>
            <InputField
              tw='desktop:width[500px] desktop:self-start mr-9'
              placeholder='Search tokens...'
              value={searchParams.term}
              onChange={(value) => setTerm(value)}
              renderRight={<MagnifyingGlass tw='text-secondary' />}
            />
            <div tw='flex space-x-2 items-center'>
              <Txt.Body2Regular>Sort by :</Txt.Body2Regular>
              <Button
                text='APY - highest'
                action={searchParams.orderField === 'annualPercentageYield'}
                bold={searchParams.orderField === 'annualPercentageYield'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('annualPercentageYield')
                }}
              />
              <Button
                text='TVL - highest'
                action={searchParams.orderField === 'totalValueLocked'}
                bold={searchParams.orderField === 'totalValueLocked'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('totalValueLocked')
                }}
              />
              <Button
                text='Owned'
                action={searchParams.orderField === 'owned'}
                bold={searchParams.orderField === 'owned'}
                onClick={() => {
                  setOrder('DESC')
                  setOrderField('owned')
                }}
              />
            </div>
          </div>
          <CustomTable
            activeRow={activeRow}
            onActiveRowChange={onRowClick}
            renderExpanded={
              <DepositWithdraw
                tokenAddress={activeRow?.tokenAddress ?? undefined}
                tokenSymbol={activeRow?.vaultName ?? undefined}
              />
            }
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
                  <TableCell.Percentage value={l.annualPercentageYield} />
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
                cell: (l: StakeToken) => <TableCell.Currency value={l.owned} />,
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
                        // TODO VALENTIN
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
