/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useEffect, useState } from 'react'
import { Txt } from './Txt'
import { InputField } from './InputField'
import { Button } from './Button'
import { etherGlobal } from '../ether'
import { useWeb3React } from '@web3-react/core'

// interface IInputFieldProps {}

export const DepositWithdraw = (props: {}) => {
  const { account } = useWeb3React()
  const [depositValue, setDepositValue] = useState<string>('0')
  const [withdrawValue, setWithdrawValue] = useState<string>('0')

  // TODO: Function will take a "tokenAddress" argument
  const getMaxWithdraw = async () => {
    setWithdrawValue(
      await etherGlobal.getMaxWithdrawAmount(
        '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
      ),
    )
  }

  // TODO: Function will take a "tokenAddress" argument
  const getMaxDeposit = async () => {
    setDepositValue(
      await etherGlobal.getMaxDepositAmount(
        '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
      ),
    )
  }

  return (
    <div
      // className={props.className}
      tw='flex flex-row justify-center gap-4 my-2 w-full'
    >
      <div tw='w-96 flex flex-col rounded-md border border-primary-300 p-5 gap-3'>
        <div tw='flex flex-row w-full justify-between'>
          <Txt.Heading2>Deposit</Txt.Heading2>
          <Txt.Heading2>4000 ($4,001.20)</Txt.Heading2>
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
        <Button text='Deposit' bold action full />
      </div>
      <div tw='w-96 flex flex-col rounded-md border border-primary-300 p-5 gap-3'>
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
      </div>
    </div>
  )
}
