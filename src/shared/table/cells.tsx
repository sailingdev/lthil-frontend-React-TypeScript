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
      }).format(value)
    : ''
  return <span>{currency}</span>
}

export const TableCell = {
  Text,
  Currency,
}
