/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { Button } from './Button'
import { IBaseProps, TransactionType } from '../types'
import { InputField } from './InputField'
import { Txt } from './Txt'
import { etherGlobal } from '../api/ether'
import { useAsync } from 'react-use'
import { useState } from 'react'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import {
  useTransactions,
  useTransaction,
  useAddTransaction,
} from '../state/hooks'
import { ContractFactory } from '../api/contract-factory'
import { addTransaction } from '../state/transaction/transaction.actions'
interface IDepositWithdrawProps extends IBaseProps {
  tokenAddress: string
  onClick: any
  tokenSymbol: string
}

export const DepositWithdraw = (props: IDepositWithdrawProps) => {
  const addTx = useAddTransaction()
  // const transactions = useTransactions()
  const [depositValue, setDepositValue] = useState<string>('0')
  const [withdrawValue, setWithdrawValue] = useState<string>('0')
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0)
  const [userTokenOwnedBalance, setUserTokenOwnedBalance] = useState<number>(0)
  const [stakeHash, setStakeHash] = useState<string | undefined>(undefined)
  const [withdrawHash, setWithdrawHash] = useState<string | undefined>(
    undefined,
  )

  const stakeTx = useTransaction(stakeHash)
  const withdrawTx = useTransaction(withdrawHash)

  const [stakeApproval, deposit] = useApprovalAction({
    approvalMeta: {
      token: props.tokenAddress,
      destination: etherGlobal.getAddresses().Vault,
      amount: Number(depositValue),
    },
    onApproval: async (tokenAddress: string, depositValue: string) => {
      const stake = await etherGlobal.depositToken(tokenAddress, depositValue)
      addTx(TransactionType.DEPOSIT, stake.hash!, {
        token: props.tokenAddress,
        destination: etherGlobal.getAddresses().Vault,
        amount: Number(depositValue),
      }) // TODO: stake meta
      setStakeHash(stake.hash)
    },
  })

  const [withdrawApproval, withdraw] = useApprovalAction({
    approvalMeta: {
      token: props.tokenAddress,
      destination: etherGlobal.getAddresses().Vault,
      amount: Number(withdrawValue),
    },
    onApproval: async (tokenAddress: string, depositValue: string) => {
      const withdraw = await etherGlobal.withdrawToken(
        tokenAddress,
        depositValue,
      )
      addTx(TransactionType.WITHDRAW, withdraw.hash!, {
        token: props.tokenAddress,
        destination: etherGlobal.getAddresses().Vault,
        amount: Number(withdrawValue),
      }) // TODO: withdraw meta
      setWithdrawHash(withdraw.hash)
    },
  })

  useAsync(async () => {
    const tokenBalance = await etherGlobal.getUserTokenBalance(
      props.tokenAddress,
    )
    setUserTokenBalance(tokenBalance) // TODO: Needs to refresh on deposit and withdraw actions

    const ownedBalance = await etherGlobal.getMaxWithdrawAmount(
      props.tokenAddress,
    )
    setUserTokenOwnedBalance(ownedBalance) // TODO: Needs to refresh on deposit and withdraw actions
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

  const depositToken = async () => {
    deposit(props.tokenAddress, depositValue)
  }

  const withdrawToken = async () => {
    withdraw(props.tokenAddress, withdrawValue)
  }

  return (
    <div
      onClick={props.onClick}
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
        <Button
          text={
            stakeApproval == 'UNKNOWN'
              ? 'Approve token spending'
              : stakeApproval == 'PENDING'
              ? 'Pending...'
              : stakeApproval == 'VERIFIED'
              ? 'Deposit'
              : 'Approve token spending'
          }
          bold
          action
          full
          onClick={depositToken}
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
            {userTokenOwnedBalance} {props.tokenSymbol}
          </Txt.Heading2>
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
          text={
            withdrawApproval == 'UNKNOWN'
              ? 'Approve token spending'
              : withdrawApproval == 'PENDING'
              ? 'Pending...'
              : withdrawApproval == 'VERIFIED'
              ? 'Withdraw'
              : 'Approve token spending'
          }
          bold
          action
          full
          onClick={withdrawToken}
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
