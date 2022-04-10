/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { IBaseProps, TransactionType } from '../../types'
import { useAddTransaction, useTransaction } from '../../state/hooks'

import { Button } from '../../shared/Button'
import { InputField } from '../../shared/InputField'
import { Txt } from '../../shared/Txt'
import { etherGlobal } from '../../api/ether'
import { getCTALabelForApproval } from '../../utils'
import tw from 'twin.macro'
import { useApprovalAction } from '../../shared/hooks/useApprovalAction'
import { useAsync } from 'react-use'
import { useState } from 'react'
import { InputFieldMax } from '../../shared/InputFieldMax'

interface IDepositWithdrawProps extends IBaseProps {
  tokenAddress: string
  tokenSymbol: string
}

export const DepositWithdraw = (props: IDepositWithdrawProps) => {
  const [depositValue, setDepositValue] = useState<string>('0')
  const [withdrawValue, setWithdrawValue] = useState<string>('0')
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0)
  const [userTokenStakedBalance, setUserTokenStakedBalance] =
    useState<number>(0)
  const [stakeHash, setStakeHash] = useState<string | undefined>(undefined)
  const [withdrawHash, setWithdrawHash] = useState<string | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(false)
  const addTx = useAddTransaction()

  const stakeTx = useTransaction(stakeHash)
  const withdrawTx = useTransaction(withdrawHash)

  const [stakeApproval, deposit] = useApprovalAction({
    approvalMeta: {
      token: props.tokenAddress,
      destination: etherGlobal.getAddresses().Vault,
      amount: Number.MAX_SAFE_INTEGER, // Number(depositValue),
    },
    onApproval: async (tokenAddress: string, depositValue: string) => {
      const stake = await etherGlobal.depositToken(tokenAddress, depositValue)
      addTx(TransactionType.DEPOSIT, stake.hash!, {
        token: props.tokenAddress,
        destination: etherGlobal.getAddresses().Vault,
        amount: Number(depositValue),
      })
      setStakeHash(stake.hash)
    },
  })

  const withdraw = async (tokenAddress: string, depositValue: string) => {
    const withdraw = await etherGlobal.withdrawToken(tokenAddress, depositValue)
    addTx(TransactionType.WITHDRAW, withdraw.hash!, {
      token: props.tokenAddress,
      destination: etherGlobal.getAddresses().Vault,
      amount: Number(withdrawValue),
    })
    setWithdrawHash(withdraw.hash)
  }

  useAsync(async () => {
    const tokenBalance = await etherGlobal.getUserTokenBalance(
      props.tokenAddress,
    )
    setUserTokenBalance(tokenBalance) // TODO: Needs to refresh on deposit and withdraw actions

    const stakedBalance = await etherGlobal.getMaxWithdrawAmount(
      props.tokenAddress,
    )
    setUserTokenStakedBalance(stakedBalance) // TODO: Needs to refresh on deposit and withdraw actions
  }, [props.tokenAddress])

  const getMaxDeposit = async () => {
    const value = (
      await etherGlobal.getMaxDepositAmount(props.tokenAddress)
    ).toString()
    setDepositValue(value)
  }

  const getMaxWithdraw = async () => {
    const value = (
      await etherGlobal.getMaxWithdrawAmount(props.tokenAddress)
    ).toString()
    setWithdrawValue(value)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={props.className}
      tw='flex flex-col tablet:flex-row justify-center gap-4 my-2 w-full'
    >
      <div tw='w-96 flex flex-col  rounded-md border border-primary-300 p-5 gap-3'>
        <div tw='flex flex-row w-full justify-between'>
          <Txt.Heading2>Deposit</Txt.Heading2>
          <Txt.Heading2>
            {userTokenBalance} {props.tokenSymbol}
          </Txt.Heading2>
        </div>
        <InputFieldMax
          value={depositValue}
          onChange={(value) => setDepositValue(value)}
          unit={props.tokenSymbol}
          onMaxClick={getMaxDeposit}
        />
        <Button
          text={getCTALabelForApproval('Deposit', stakeApproval)}
          bold
          action
          full
          onClick={() => deposit(props.tokenAddress, depositValue)}
        />
        <Txt.CaptionMedium>
          {!stakeTx
            ? ''
            : stakeTx.status == 'verified'
            ? 'Transaction verified.'
            : 'Transaction pending...'}
        </Txt.CaptionMedium>
      </div>
      <div tw='w-96 flex flex-col rounded-md border border-primary-300 p-5 gap-3'>
        <div tw='flex flex-row w-full justify-between'>
          <Txt.Heading2>Withdraw</Txt.Heading2>
          <Txt.Heading2>
            {userTokenStakedBalance} {props.tokenSymbol}
          </Txt.Heading2>
        </div>
        <InputFieldMax
          value={withdrawValue}
          onChange={(value) => setWithdrawValue(value)}
          unit={props.tokenSymbol}
          onMaxClick={getMaxWithdraw}
        />
        <Button
          text='Withdraw'
          bold
          action
          full
          onClick={() => withdraw(props.tokenAddress, withdrawValue)}
        />
        <Txt.CaptionMedium>
          {!withdrawTx
            ? ''
            : withdrawTx.status == 'verified'
            ? 'Transaction verified.'
            : 'Transaction pending...'}
        </Txt.CaptionMedium>
      </div>
    </div>
  )
}
