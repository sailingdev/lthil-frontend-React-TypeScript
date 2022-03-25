import { Interpolation, Theme } from '@emotion/react'
import { CSSProperties } from 'react'
import { BigNumber } from 'ethers'

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
  APPROVAL = 'APPROVAL',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  MTS_OPEN_POSITION = 'MTS_OPEN_POSITION',
  MTS_CLOSE_POSITION = 'MTS_CLOSE_POSITION',
}

export interface Transaction {
  type: TransactionType
  chainId: number
  meta:
    | WithdrawTransactionMeta
    | StakeTransactionMeta
    | ApprovalTransactionMeta
    | MtsOpenPositionMeta
    | MtsClosePositionMeta
  tx: string
  status: 'pending' | 'verified'
  receipt?: TransactionReceipt
}

export interface TransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export type CreatableTransaction = Omit<Transaction, 'status'>
export type FinalizableTransaction = Pick<Transaction, 'tx' | 'chainId'> & {
  receipt: TransactionReceipt
}

export enum Approval {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  UNKNOWN = 'UNKNOWN',
  DENIED = 'DENIED',
}

export interface ApprovalTransactionMeta {
  destination: string
  token: string
  amount: number
}

export interface StakeTransactionMeta {
  destination: string
  token: string
  amount: number
}

export interface WithdrawTransactionMeta {
  destination: string
  token: string
  amount: number
}

export interface MtsOpenPositionMeta {
  positionType: PositionType
  spentToken: string
  obtainedToken: string
  margin: number
  slippage: number
  priority: Priority
  leverage: number
  deadline: number
}

export interface MtsClosePositionMeta {
  positionId: string
}

export type Priority = 'buy' | 'sell'

export type PositionType = 'long' | 'short'

export interface OpenPosition {
  positionType: PositionType
  spentToken: string
  obtainedToken: string
  margin: number
  slippage: number
  priority: Priority
  leverage: number
  deadline: number
}
export interface IPositionWasOpenedEvent {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
  event: 'PositionWasOpened'
  eventSignature: 'PositionWasOpened(uint256,address,address,address,address,uint256,uint256,uint256,uint256,uint256)'
  args: (BigNumber | string)[]
}

export interface IParsedPositionWasOpenedEvent {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
  event: 'PositionWasOpened'
  eventSignature: 'PositionWasOpened(uint256,address,address,address,address,uint256,uint256,uint256,uint256,uint256)'
  positionId: string
  ownerId: string
  owedToken: string
  heldToken: string
  collateralToken: string
  collateral: BigNumber
  principal: BigNumber
  allowance: BigNumber
  fees: BigNumber
  createdAt: BigNumber
}

export interface IPositionWasClosedEvent {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
  event: 'PositionWasClosed'
  eventSignature: 'PositionWasClosed(uint256)'
  args: BigNumber[]
}

export interface IPrasedPositionWasClosedEvent {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
  event: 'PositionWasClosed'
  eventSignature: 'PositionWasClosed(uint256)'
  positionId: BigNumber
}

export interface IPositionRow {
  tokenPair: string
  position: string
  profit: {
    currencyValue: number
    percentageValue: number
  }
  trend: string
  positionId: string
}
