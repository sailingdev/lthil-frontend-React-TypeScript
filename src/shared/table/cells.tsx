import 'twin.macro'

import { FixedNumber } from 'ethers'
import { IPosition } from '../../types'
import { Txt } from '../Txt'
import { isDesktop } from '../../utils'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'
import tw from 'twin.macro'
import { usePositionProfit } from '../hooks/usePositionProfit'

/** @jsxImportSource @emotion/react */

const Text = (props: { value: string }) => {
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{props.value}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{props.value}</Txt.Body1Regular>
  )
}

const Number = (props: { value: number | FixedNumber }) => {
  const value = (
    props.value instanceof FixedNumber
      ? props.value
      : FixedNumber.from(props.value.toString())
  )
    .round(4)
    .toString()
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{value}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{value}</Txt.Body1Regular>
  )
}

export const TokenPair = (props: {
  spentTokenSymbol: string
  obtainedTokenSymbol: string
}) => {
  const { spentTokenSymbol, obtainedTokenSymbol } = props
  return (
    <div tw='flex flex-row justify-start items-center gap-6'>
      <div tw='relative'>
        <div tw='w-7 h-7 border-radius[100%] bg-primary-100 absolute bottom[-2px] left[18px] z-index[2]'></div>
        <img
          tw='w-6 h-6 z-index[3]'
          src={
            tokens.find((token) => token.symbol === spentTokenSymbol)?.logoURI
          }
          alt={spentTokenSymbol}
        />
        <img
          tw='w-6 h-6 left-5 bottom-0 absolute z-index[4]'
          src={
            tokens.find((token) => token.symbol === obtainedTokenSymbol)
              ?.logoURI
          }
          alt={obtainedTokenSymbol}
        />
      </div>
      <Text value={`${spentTokenSymbol}/${obtainedTokenSymbol}`} />
    </div>
  )
}

const VaultName = (props: { tokenSymbol: string }) => {
  const { tokenSymbol } = props
  return (
    <div tw='flex flex-row justify-start items-center gap-3'>
      <img
        tw='w-6 h-6'
        src={tokens.find((token) => token.symbol === tokenSymbol)?.logoURI}
        alt={tokenSymbol}
      />
      <Text value={tokenSymbol} />
    </div>
  )
}

const Currency = (props: { value?: number }) => {
  const value = props.value ?? 0
  const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(value)
  return <Text value={currency} />
}

const Percentage = (props: { value?: number }) => {
  const value = props.value ?? 0
  const percentage = new Intl.NumberFormat('en-us', {
    style: 'percent',
  }).format(value * 10)

  return <Text value={percentage} />
}

const Profit = (props: { position: IPosition }) => {
  const profit = usePositionProfit(props.position)
  if (!profit) {
    return null
  }

  const [currencyValue, percentageValue] = profit

  const currency = currencyValue
    ? new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
        signDisplay: 'always',
      }).format(currencyValue.toUnsafeFloat())
    : ''
  const percentage = percentageValue
    ? new Intl.NumberFormat('en-us', {
        style: 'percent',
        signDisplay: 'always',
      }).format(percentageValue.toUnsafeFloat())
    : ''

  return isDesktop ? (
    <Txt.Body2Regular
      css={[
        percentageValue.toUnsafeFloat() > 0 ? tw`text-success` : tw`text-error`,
      ]}
    >{`${currency} (${percentage})`}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular
      css={[
        percentageValue.toUnsafeFloat() > 0 ? tw`text-success` : tw`text-error`,
      ]}
    >{`${currency} (${percentage})`}</Txt.Body1Regular>
  )
}

const Button = (props: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text: string
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()} tw='flex flex-row justify-end'>
      <button
        onClick={props.onClick}
        css={[tw`rounded-md py-1 px-2 border border-primary-400 text-font-100`]}
      >
        {props.text}
      </button>
    </div>
  )
}

export const TableCell = {
  Text,
  Currency,
  Percentage,
  Profit,
  Button,
  TokenPair,
  VaultName,
  Number,
}
