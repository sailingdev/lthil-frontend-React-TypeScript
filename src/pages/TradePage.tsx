/** @jsxImportSource @emotion/react */
import 'twin.macro'

import {
  useAccountAddress,
  useAccountBalance,
  useLatestBlock,
  useStakeTokens,
} from '../state/hooks'

import { ContentContainer } from '../shared/ContentContainer'
import { useNetwork } from '../shared/hooks/useNetwork'
import { etherGlobal } from '../ether'
import { ethers } from 'ethers'

export const TradePage = () => {
  const block = useLatestBlock()
  const balance = useAccountBalance()
  const network = useNetwork()
  const address = useAccountAddress()
  const stake = useStakeTokens()
  console.log('Block', block)
  console.log('Balance', balance)
  console.log('Network', network)
  console.log('Address', address)
  console.log('Stake', stake)

  const runCode = async () => {
    try {
      const Vault = etherGlobal.getVaultContract()
      const MockTaxedToken = etherGlobal.getMockTaxedTokenContract()
      const MockWETHToken = etherGlobal.getMockWETHTokenContract()

      const provider = etherGlobal.getProvider
      //@ts-ignore
      const signer = etherGlobal.getSigner()
      console.log('PROVIDER: ', provider)
      console.log('SIGNER: ', signer)

      const formattedAmount = ethers.utils.parseUnits(
        '26',
        await MockWETHToken.decimals(),
      )

      console.log(
        'User claimable WETH tokens from vault: ',
        //@ts-ignore
        await Vault.claimable('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
          gasLimit: 1000000,
        }),
      )

      console.log(
        'Balance: ',
        //@ts-ignore
        await Vault.balance('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
          gasLimit: 1000000,
        }),
      )

      console.log(
        'Vaults: ',
        //@ts-ignore
        await Vault.vaults('0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE', {
          gasLimit: 1000000,
        }),
      )

      console.log(
        'User deposited token to vault (events): ',
        //@ts-ignore
        await Vault.queryFilter(Vault.filters.Deposit(), 'earliest', 'latest'),
      )

      console.log(
        'Approve :',
        await MockWETHToken.approve(
          '0x27001942d886573b4C68d77547143C4b98f3775C',
          formattedAmount,
        ),
      )

      console.log(
        'Stake: ',
        //@ts-ignore
        await Vault.stake(
          '0xA7C0df5B42E009115EEcc6e0E35514DD9f703AfE',
          formattedAmount,
          {
            gasLimit: 1000000,
          },
        ),
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ContentContainer>
      <div>Block: {block}</div>
      <div>Address: {address}</div>
      <div>Balance: {balance}</div>
      <div>Network: {network?.name}</div>
      <div>Chain Id: {network?.chainId}</div>

      <button onClick={() => runCode()}>Stake 26 WETH</button>
    </ContentContainer>
  )
}
