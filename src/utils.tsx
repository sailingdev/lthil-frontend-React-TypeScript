import {
  Approval,
  ApprovalTransactionMeta,
  MtsOpenPositionMeta,
  StakeTransactionMeta,
  Transaction,
  TransactionType,
} from './types'
import { BigNumber, ethers } from 'ethers'

import { format } from 'date-fns'
import tokenList from './assets/tokenlist.json'

export const mapErrorToCode = (e: any): number => {
  return e?.response?.status ?? 500
}

interface IFormatDateOptions {
  dateFormat?: string
  uppercase?: boolean
}

export const formatDate = (date: Date, options?: IFormatDateOptions): any => {
  const { dateFormat = 'yyyy-MM-dd', uppercase = false } = options || {}
  const startDate = format(date, dateFormat)

  return uppercase ? startDate.toUpperCase() : startDate
}

export const hexToDecimal = (hex: string) => {
  return parseFloat(ethers.utils.formatUnits(BigNumber.from(hex).toString()))
}

export const TABLET_BREAKPOINT = 480
export const DESKTOP_BREAKPOINT = 1024
export const isDesktop = window.screen.width >= DESKTOP_BREAKPOINT
export const isTablet = window.screen.width >= TABLET_BREAKPOINT
export const isMobile = !isDesktop && !isTablet

export const getTransactionLabel = (t: Transaction) => {
  if (t.type === TransactionType.APPROVAL) {
    const meta = t.meta as ApprovalTransactionMeta
    const tokenName = tokenList.tokens.find(
      (t) => t.address === meta.token,
    )?.symbol
    return `Approval for ${meta.amount} ${tokenName}`
  } else if (t.type === TransactionType.DEPOSIT) {
    const meta = t.meta as StakeTransactionMeta
    const tokenName = tokenList.tokens.find(
      (t) => t.address === meta.token,
    )?.symbol
    return `Deposited ${meta.amount} of ${tokenName} into Vault`
  } else if (t.type === TransactionType.WITHDRAW) {
    const meta = t.meta as StakeTransactionMeta
    const tokenName = tokenList.tokens.find(
      (t) => t.address === meta.token,
    )?.symbol
    return `Withdraw ${meta.amount} of ${tokenName} out of Vault`
  } else if (t.type === TransactionType.MTS_OPEN_POSITION) {
    const meta = t.meta as MtsOpenPositionMeta
    const obtainedTokenName = tokenList.tokens.find(
      (t) => t.address === meta.obtainedToken,
    )?.symbol
    const spentTokenName = tokenList.tokens.find(
      (t) => t.address === meta.spentToken,
    )?.symbol
    return `Opened ${meta.positionType} position ${obtainedTokenName}/${spentTokenName}`
  }
  return 'Transaction'
}

export const getCTALabelForApproval = (action: string, approval: Approval) => {
  return approval == 'UNKNOWN'
    ? 'Approve token spending'
    : approval == 'PENDING'
    ? 'Pending...'
    : approval == 'VERIFIED'
    ? action
    : 'Approve token spending'
}
