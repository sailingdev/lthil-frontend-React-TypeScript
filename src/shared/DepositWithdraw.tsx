import 'twin.macro'

import { Button } from './Button'
import { IBaseProps } from '../types'
import { InputField } from './InputField'
import { Txt } from './Txt'
import { etherGlobal } from '../api/ether'
import tw from 'twin.macro'
import { useAsync } from 'react-use'
import { useState } from 'react'

interface IDepositWithdrawProps extends IBaseProps {
  tokenAddress: string
  onClick: any
}

export const DepositWithdraw = (props: IDepositWithdrawProps) => {
  const [depositValue, setDepositValue] = useState<string>('0')
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0)

  useAsync(async () => {
    const balance = await etherGlobal.getUserTokenBalance(props.tokenAddress)
    setUserTokenBalance(balance)
  }, [props.tokenAddress])

  const getMaxDeposit = async () => {
    const value = (
      await etherGlobal.getMaxDepositAmount(props.tokenAddress!)
    ).toString()
    setDepositValue(value)
  }

  const depositToken = async () => {
    // await etherGlobal.depositToken(props.tokenAddress!, depositValue)
  }

  return (
    <div
      onClick={props.onClick}
      className={props.className}
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
    </div>
  )
}
