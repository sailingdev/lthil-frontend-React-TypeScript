import 'twin.macro'
import tw from 'twin.macro'
import { Info, ChartLine } from 'phosphor-react'

import { isDesktop } from '../../utils'
import { Txt } from '../Txt'

/** @jsxImportSource @emotion/react */

// TODO: Use the Text component where applicable

const Text = (props: { value: string | number }) => {
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{props.value}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{props.value}</Txt.Body1Regular>
  )
}

const Currency = (props: { value: number; format: string }) => {
  const { value, format } = props
  const currency = value
    ? new Intl.NumberFormat(format, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      }).format(value)
    : ''
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{currency}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{currency}</Txt.Body1Regular>
  )
}

const Percentage = (props: { value: number; format: string }) => {
  const { value, format } = props
  const percentage = value
    ? new Intl.NumberFormat(format, {
        style: 'percent',
      }).format(value * 10)
    : ''
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{percentage}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{percentage}</Txt.Body1Regular>
  )
}

const Profit = (props: {
  currencyValue: number
  percentageValue: number
  format: string
}) => {
  const { currencyValue, percentageValue, format } = props

  const currency = currencyValue
    ? new Intl.NumberFormat(format, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
        signDisplay: 'always',
      }).format(currencyValue)
    : ''
  const percentage = percentageValue
    ? new Intl.NumberFormat(format, {
        style: 'percent',
        signDisplay: 'always',
      }).format(percentageValue * 10)
    : ''

  return isDesktop ? (
    <Txt.Body2Regular
      css={[percentageValue > 0 ? tw`text-success` : tw`text-error`]}
    >{`${currency} (${percentage})`}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular
      css={[percentageValue > 0 ? tw`text-success` : tw`text-error`]}
    >{`${currency} (${percentage})`}</Txt.Body1Regular>
  )
}

const TokenIcons = () => {
  return (
    <div tw='flex flex-row justify-end gap-3'>
      <ChartLine tw='text-font-100 dark:text-font-200 height[16px] width[16px]' />
      <Info tw='text-font-100 dark:text-font-200 height[16px] width[16px]' />
    </div>
  )
}

export const TableCell = {
  Text,
  Currency,
  Percentage,
  Profit,
  TokenIcons,
}
