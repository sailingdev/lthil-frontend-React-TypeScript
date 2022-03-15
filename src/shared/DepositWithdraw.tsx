import 'twin.macro'

import { Button } from './Button'
import { InputField } from './InputField'
import { Txt } from './Txt'
import { etherGlobal } from '../ether'
import tw from 'twin.macro'
import { useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { useWeb3React } from '@web3-react/core'
import { useAsync } from 'react-use'

// interface IInputFieldProps {}

export const DepositWithdraw = (props: {
  tokenAddress: string | undefined
  onClick: any
}) => {
  const [depositValue, setDepositValue] = useState<string>('0')
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0)

  // Client said they don't need the withdraw feature, so I comment it out.

  // const [withdrawValue, setWithdrawValue] = useState<string>('0')

  // const getMaxWithdraw = async () => {
  //   setWithdrawValue(
  //     await etherGlobal.getMaxWithdrawAmount(props.tokenAddress!).toString(),
  //   )
  // }

  useAsync(async () => {
    setUserTokenBalance(
      await etherGlobal.getUserTokenBalance(props.tokenAddress!),
    )
  })

  const getMaxDeposit = async () => {
    const value = (
      await etherGlobal.getMaxDepositAmount(props.tokenAddress!)
    ).toString()
    setDepositValue(value)
  }

  const depositToken = () => {
    etherGlobal.depositToken(props.tokenAddress!, depositValue)
  }

  return (
    <div
      onClick={props.onClick}
      // className={props.className}
      tw='flex flex-row justify-center gap-4 my-2 w-full'
    >
      <div tw='w-96 flex flex-col rounded-md border border-primary-300 p-5 gap-3'>
        <div tw='flex flex-row w-full justify-between'>
          <Txt.Heading2>Deposit</Txt.Heading2>
          <Txt.Heading2>{userTokenBalance} ($placeholder)</Txt.Heading2>
        </div>
        <InputField
          value={depositValue}
          onChange={(value) => setDepositValue(value)}
          renderRight={
            <button
              onClick={getMaxDeposit}
              css={[
                tw`border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2`,
              ]}
            >
              <Txt.Body2Regular>Max</Txt.Body2Regular>
            </button>
          }
        />
        <Button text='Deposit' bold action full onClick={depositToken} />
      </div>
      {/* <div tw='w-96 flex flex-col rounded-md border border-primary-300 p-5 gap-3'>
        <div tw='flex flex-row w-full justify-between'>
          <Txt.Heading2>Deposited</Txt.Heading2>
          <Txt.Heading2>0.000 ($0.00)</Txt.Heading2>
        </div>
        <InputField
          value={withdrawValue}
          onChange={(value) => setWithdrawValue(value)}
          renderRight={
            <button
              onClick={getMaxWithdraw}
              css={[
                tw`border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2`,
              ]}
            >
              <Txt.Body2Regular>Max</Txt.Body2Regular>
            </button>
          }
        />
        <Button
          tw='bg-primary-100 border-font-200 border'
          text='Withdraw'
          bold
          full
        />
      </div> */}
    </div>
  )
}
