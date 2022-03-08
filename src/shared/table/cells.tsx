import 'twin.macro'

import { Txt } from '../Txt'
import { isDesktop } from '../../utils'
import tw from 'twin.macro'

/** @jsxImportSource @emotion/react */

// TODO

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

export const TableCell = {
  Text,
  Currency,
  Percentage,
  Profit,
}
