import { Interpolation, Theme } from '@emotion/react'

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
  annualPositionYield: number
  totalValueLocked: number
  owned: number
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
