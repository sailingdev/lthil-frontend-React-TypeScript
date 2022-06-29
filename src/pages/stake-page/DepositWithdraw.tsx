/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { useState } from 'react'
import { useAsync } from 'react-use'
import { FixedNumber } from 'ethers'

import { Button } from '../../shared/Button'
import { InputFieldMax } from '../../shared/InputFieldMax'
import { Txt } from '../../shared/Txt'
import { useApprovalAction } from '../../shared/hooks/useApprovalAction'
import { etherGlobal } from '../../api/ether'
import { useAddTransaction, useTransaction } from '../../state/hooks'
import { getCTALabelForApproval } from '../../utils'
import { Approval, IBaseProps, TransactionType } from '../../types'

interface IDepositWithdrawProps extends IBaseProps {
  tokenAddress: string
  tokenSymbol: string
}

export const DepositWithdraw = (props: IDepositWithdrawProps) => {
  const [depositValue, setDepositValue] = useState<string>('0')
  const [withdrawValue, setWithdrawValue] = useState<string>('0')
  const [userTokenBalance, setUserTokenBalance] = useState<FixedNumber>(
    FixedNumber.from('0'),
  )
  const [userTokenStakedBalance, setUserTokenStakedBalance] =
    useState<FixedNumber>(FixedNumber.from('0'))
  const [stakeHash, setStakeHash] = useState<string | undefined>(undefined)
  const [withdrawHash, setWithdrawHash] = useState<string | undefined>(
    undefined,
  )
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
  const isStakeLoading =
    stakeApproval === Approval.PENDING
      ? true
      : !stakeTx
      ? false
      : stakeTx.status !== 'verified'

  const isWithdrawLoading = !withdrawTx
    ? false
    : withdrawTx.status !== 'verified'

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
            {userTokenBalance.round(4).toString()} {props.tokenSymbol}
          </Txt.Heading2>
        </div>
        <InputFieldMax
          value={depositValue}
          onChange={(value) => setDepositValue(value)}
          unit={props.tokenSymbol}
          address={props.tokenAddress}
          onMaxClick={getMaxDeposit}
          StateChanger={setDepositValue}
        />
        <Button
          text={getCTALabelForApproval('Deposit', stakeApproval)}
          bold
          action
          full
          isLoading={isStakeLoading}
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
            {userTokenStakedBalance.round(4).toString()} {props.tokenSymbol}
          </Txt.Heading2>
        </div>
        <InputFieldMax
          address={props.tokenAddress}
          value={withdrawValue}
          onChange={(value) => setWithdrawValue(value)}
          unit={props.tokenSymbol}
          onMaxClick={getMaxWithdraw}
          StateChanger={setDepositValue}
        />
        <Button
          text='Withdraw'
          bold
          action
          full
          isLoading={isWithdrawLoading}
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
