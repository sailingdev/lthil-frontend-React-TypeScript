import 'twin.macro'

import {
  useAccountAddress,
  useAccountBalance,
  useFinalizeTransaction,
  useLatestBlock,
  useStakeTokens,
  useTransactions,
} from '../state/hooks'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import { useNetwork } from '../shared/hooks/useNetwork'
import { useState } from 'react'
import { etherGlobal } from '../api/ether'

export const TradePage = () => {
  const block = useLatestBlock()
  const balance = useAccountBalance()
  const network = useNetwork()
  const address = useAccountAddress()
  const transactions = useTransactions()
  const [approval, action] = useApprovalAction({
    approvalMeta: {
      token: '0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b',
      destination: '0x27001942d886573b4C68d77547143C4b98f3775C',
      amount: 7,
    },
    onApproval: (s: string) => console.log(s),
  })

  // console.log('Block', block)
  // console.log('Balance', balance)
  // console.log('Network', network)
  // console.log('Address', address)
  // console.log('Stake', stake)

  // const runCode = async () => {
  //   try {
  //     // const Vault = ContractFactory.getVaultContract()
  //     // const MockTaxedToken = etherGlobal.getMockTaxedTokenContract()
  //     // const MockWETHToken = etherGlobal.getMockWETHTokenContract()

  //     const provider = etherGlobal.getProvider
  //     //@ts-ignore
  //     const signer = etherGlobal.getSigner()
  //     console.log('PROVIDER: ', provider)
  //     console.log('SIGNER: ', signer)

  //     // const formattedAmount = ethers.utils.parseUnits(
  //     //   '26',
  //     //   await MockWETHToken.decimals(),
  //     // )

  //     console.log(
  //       'User claimable WETH tokens from vault: ',
  //       //@ts-ignore
  //       await Vault.claimable('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
  //         gasLimit: 1000000,
  //       }),
  //     )

  //     console.log(
  //       'Balance: ',
  //       //@ts-ignore
  //       await Vault.balance('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
  //         gasLimit: 1000000,
  //       }),
  //     )

  //     console.log(
  //       'Vaults: ',
  //       //@ts-ignore
  //       await Vault.vaults('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
  //         gasLimit: 1000000,
  //       }),
  //     )

  //     console.log(
  //       'User deposited token to vault (events): ',
  //       //@ts-ignore
  //       await Vault.queryFilter(Vault.filters.Deposit(), 'earliest', 'latest'),
  //     )

  //     // console.log(
  //     //   'Approve :',
  //     //   await MockWETHToken.approve(
  //     //     '0x27001942d886573b4C68d77547143C4b98f3775C',
  //     //     formattedAmount,
  //     //   ),
  //     // )

  //     console.log(
  //       'Stake: ',
  //       //@ts-ignore
  //       await Vault.stake(
  //         '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
  //         formattedAmount,
  //         {
  //           gasLimit: 1000000,
  //         },
  //       ),
  //     )
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const openposition = async () => {
  //   try {
  //     const MockWETHToken = etherGlobal.getMockWETHTokenContract()
  //     const MarginTrading = etherGlobal.getMarginTradingStrategyContract()
  //     const MockKyberNetworkProxy =
  //       etherGlobal.getMockKyberNetworkProxyContract()

  //     const provider = etherGlobal.getProvider()
  //     //@ts-ignore
  //     const signer = etherGlobal.getSigner()
  //     console.log('PROVIDER: ', provider)
  //     console.log('SIGNER: ', signer)

  //     const positionData2 = {
  //       spentToken: '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', // WETH
  //       obtainedToken: '0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b', // MockTaxedToken
  //       collateral: '0xde0b6b3a7640000',
  //       collateralIsSrcToken: true,
  //       minObtained: '0',
  //       maxSpent: '0xde0b6b3a7640000',
  //       deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
  //     }

  //     // Approve spending a certian amount of tokens to the marginTrading contract
  //     // console.log(
  //     //   'Approve: ',
  //     //   await MockWETHToken.approve(
  //     //     '0xf672812E0D29aAbEEfA818E727b710D78D8062B4',
  //     //     '0x21E19E0C9BAB2400000',
  //     //   ),
  //     // )

  //     // Still need to figure out what this rate is
  //     // console.log(
  //     //   'Kyber setRate: ',
  //     //   await MockKyberNetworkProxy.setRate(
  //     //     '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
  //     //     '0x80b5AFB071d2F13Dc6F106B797a2583b1245c97b',
  //     //     {
  //     //       numerator: 3000,
  //     //       denominator: 1,
  //     //     },
  //     //   ),
  //     // )

  //     // Check how much money the dapp can spend with the strategy contract
  //     // console.log(
  //     //   'allowance: ',
  //     //   await MockWETHToken.allowance(
  //     //     '0x4678820caa137EE5FDcE601E1963a3b487d8F1f4', // Wallet
  //     //     '0xf672812E0D29aAbEEfA818E727b710D78D8062B4', // Strategy address
  //     //   ),
  //     // )

  //     // TODO: Add allow button to frontned (just a reminder to write this to ithil)

  //     const openPosition = await MarginTrading.openPosition(positionData2, {
  //       gasLimit: 1000000,
  //     })
  //     console.log(openPosition)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const getAllPositionEvents = async () => {
  //   const MarginTradingStrategy = etherGlobal.getMarginTradingStrategyContract()

  //   const openedPositions = await MarginTradingStrategy.queryFilter(
  //     MarginTradingStrategy.filters.PositionWasOpened(),
  //     '0x1',
  //     'latest',
  //   )
  //   console.log('OPE: ', openedPositions)
  // }

  const finalizeTransaction = useFinalizeTransaction()

  return (
    <ContentContainer>
      <div>Block: {block}</div>
      <div>Address: {address}</div>
      <div>Balance: {balance}</div>
      <div>Network: {network?.name}</div>
      <div>Chain Id: {network?.chainId}</div>
      <Button
        text='Add dummy transaction'
        primary
        onClick={async () => {
          action('akakaka')
        }}
      />
      <Button
        text='Finalize transaction'
        primary
        onClick={() => {
          // @ts-ignore

          finalizeTransaction('abc', {})
        }}
      />
      <div>{JSON.stringify(transactions)}</div>
      <div>{approval}</div>

      {/* <button onClick={() => runCode()}>Stake 26 WETH</button>
      <button onClick={() => openposition()}>OpenPosition</button>
      <button onClick={() => getAllPositionEvents()}>
        Get all position events
      </button> */}
    </ContentContainer>
  )
}
