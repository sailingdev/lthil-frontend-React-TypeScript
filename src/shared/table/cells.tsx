import 'twin.macro'

/** @jsxImportSource @emotion/react */

// TODO

const Text = (props: { value: string | number }) => {
  return <span>{props.value}</span>
}

const Currency = (props: { value: number; format?: string }) => {
  const { value, format } = props
  const currency = value
    ? new Intl.NumberFormat(format, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      }).format(value)
    : ''
  return <span>{currency}</span>
}

const Percentage = (props: { value: number; format?: string }) => {
  const { value, format } = props
  const percentage = value
    ? new Intl.NumberFormat(format, {
        style: 'percentage',
      }).format(value)
    : ''
  return <span>{percentage}</span>
}

// const Profit = (props: {
//   value: number,
//   percentage: number,
//   sign: '+' | '-'
// }) => {
// }

export const TableCell = {
  Text,
  Currency,
  Percentage,
}
