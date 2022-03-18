import { Interpolation, Theme } from '@emotion/react'

import { BigNumber } from 'ethers'
import { CSSProperties } from 'react'

export interface ISearchParams {
  term: string
  size: number
  page: number
  order: 'ASC' | 'DESC'
  orderField: string
}

export type GenericSearchResult<T> = {
  count: number
  hasMore: boolean
  items: Array<T>
  totalPages: number
}

export type ICSSProps = {
  className?: string | undefined
  css?: Interpolation<Theme>
  style?: CSSProperties | undefined
}

export interface IDropdownOption {
  label: string
  value: any
}
export interface ISuccessModal {
  title: string
  content?: string
}

export interface IBaseProps {
  className?: string | undefined
}

export type Maybe<T> = T | null | undefined

export interface TokenDetails {
  name: string
  symbol: string
  decimals: number
  balance: string
}

export interface StakeToken {
  vaultName: string
  annualPercentageYield: number
  totalValueLocked: number
  owned: number
  tokenAddress: string
}

export interface PositionWasOpenedEvent {
  id: string
  owner: string
  owedToken: string
  heldToken: string
  collateralToken: string
  collateral: string
  principal: string
  allowance: string
  fees: string
  createdAt: string
}

export interface ProfitsAndLosses {
  currencyValue: number
  percentageValue: number
}

export interface PositionRow {
  tokenPair: string
  position: string
  profit: ProfitsAndLosses
  trend: string
}

export enum TransactionType {
  APPROVE = 'APPROVE',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  MTS_OPEN_POSITION = 'MTS_OPEN_POSITION',
  MTS_CLOSE_POSITION = 'MTS_CLOSE_POSITION',
}

export interface Transaction {
  type: TransactionType
  chainId: number
  meta: any
  tx: string
  status: 'pending' | 'verified'
  receipt?: TransactionReceipt
}

export interface TransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  root?: string
  gasUsed: BigNumber
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: Array<any>
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: BigNumber
  effectiveGasPrice: BigNumber
  byzantium: boolean
  type: number
  status?: number
}
export type CreatableTransaction = Omit<Transaction, 'status'>
export type FinalizableTransaction = Pick<Transaction, 'tx' | 'chainId'> & {
  receipt: TransactionReceipt
}
