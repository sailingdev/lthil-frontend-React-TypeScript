/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { isMobile } from '../utils'
import { Txt } from './Txt'

interface IWalletIndicatorProps {
  address?: string
  currency?: string
  amount?: string
  providerIcon?: any
}

export const WalletIndicator = (props: IWalletIndicatorProps) => {
  return (
    <div tw='bg-primary-200 border-0 rounded-md cursor-pointer flex flex-row items-center px-2 py-1.5'>
      {!isMobile && (
        <>
          <Txt.ButtonMedium tw='mr-1'>
            {props.amount?.substring(0, 4)}
          </Txt.ButtonMedium>
          <Txt.ButtonMedium tw='mr-2'>{props.currency}</Txt.ButtonMedium>
        </>
      )}
      <div tw='py-2 px-2 rounded-md bg-primary-400 flex flex-row justify-center items-center gap-1 dark:bg-primary-100'>
        {props.providerIcon}
        <Txt.ButtonMedium tw='line-height[0px]'>
          {props.address?.substring(0, 6)}...
          {props.address?.substring(
            props.address.length - 5,
            props.address.length,
          )}
        </Txt.ButtonMedium>
      </div>
    </div>
  )
}
