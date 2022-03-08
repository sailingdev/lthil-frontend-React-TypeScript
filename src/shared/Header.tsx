import 'twin.macro'

import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
/** @jsxImportSource @emotion/react */
import Fortmatic from 'fortmatic'
import { ReactComponent as LogoDark } from '../assets/logoDark.svg'
import { ReactComponent as LogoLight } from '../assets/logoLight.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import VaultAbi from '../assets/abi.json'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { ether } from '../ether'
import { ethers } from 'ethers'
import tw from 'twin.macro'
import { useAsync } from 'react-use'
// @ts-nocheck
import { useState } from 'react'
import { useTheme } from '../state/hooks'

const lightTheme = {
  background: 'rgb(255, 255, 255)',
  main: 'rgb(7, 11, 15)',
  secondary: 'rgb(78, 95, 113)',
  border: 'rgba(195, 195, 195, 0.14)',
  hover: 'rgb(242, 245, 246)',
}

const darkTheme = {
  background: 'rgb(21, 26, 41)',
  main: 'rgb(242, 245, 246)',
  secondary: 'rgb(164, 177, 190)',
  border: 'rgba(195, 195, 195, 0.14)',
  hover: 'rgb(32, 41, 58)',
}
export const Header = () => {
  const theme = useTheme()

  const [web3Modal] = useState(
    new Web3Modal({
      cacheProvider: true,
      theme: theme ? darkTheme : lightTheme,
      network: 'rinkeby',
      // cacheProvider: true,
      // theme: {
      //   background: 'rgb(39, 49, 56)',
      //   main: 'rgb(199, 199, 199)',
      //   secondary: 'rgb(136, 136, 136)',
      //   border: 'rgba(195, 195, 195, 0.14)',
      //   hover: 'rgb(16, 26, 32)',
      // },
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: '4a06377afcb842f394dc13f47f6cac54',
          },
        },
        // Fortmatic returns 403 when accessing PRC URL. Are we sure this is the right data?
        fortmatic: {
          package: Fortmatic,
          options: {
            key: 'pk_test_9E56112919F5EFA6', // This is Valentin's API key
            network: {
              rpcUrl: 'https://kovan.infura.io',
              chainId: 42,
            },
          },
        },
      },
    }),
  )
  const [connected, setConnected] = useState(() => !!web3Modal.cachedProvider)

  useAsync(async () => {
    const provider = await web3Modal.connect()
    setConnected(true)
    await ether.initializeProvider(provider)

    const address = '0xBEeB7Aa057aec50c30c93c893086B9c0eDc157Dd' // Vault
    const tokenAddress = '0x1C51De870718801E745482b25d3bB2Bd3b86e08C' // MockTaxedToken

    // Vault contract
    const c = ethers.ContractFactory.getContract(
      address,
      VaultAbi.abi,
      ether.getSigner(),
    )
    try {
      const a = c.interface?.getFunction('owner')

      console.log(
        c.interface.encodeFunctionData(
          c.interface?.getFunction('getEthBalance'),
          [await ether.getAccount()],
        ),
      )

      const erc20 = ether.getERC20Contract()
    } catch (e) {
      console.error(e)
    }

    // const filters = c.filters
  }, [])

  return (
    <div tw='max-w-1920 w-[calc(100% - 9rem)] my-6 mx-auto flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        {theme ? (
          <LogoDark css={[tw`w-32 h-8`]} />
        ) : (
          <LogoLight css={[tw`w-32 h-8`]} />
        )}
        <span tw='mt-1 ml-24 flex flex-row'>
          <NavigationMenu />
          <ThemeSwitch />
        </span>
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrEth} rightIcon={ArrowDown} />
        <Button
          text={connected ? 'Disconnect' : `Connect wallet`}
          action
          onClick={async () => {
            if (connected) {
              await web3Modal.clearCachedProvider()
              return window.location.reload()
            }
            try {
              const instance = await web3Modal.connect()
              ether.initializeProvider(instance)

              setConnected(true)
              //

              // console.log(
              //   'Transaction count: ',
              //   await signer.getTransactionCount(),
              // )
              // console.log('Account address: ', await signer.getAddress())
              // console.log('ChainId: ', await signer.getChainId())

              const address = '0xBEeB7Aa057aec50c30c93c893086B9c0eDc157Dd' // Vault
              // const tokenAddress = '0x1C51De870718801E745482b25d3bB2Bd3b86e08C' // MockTaxedToken

              // Vault contract
              const c = ethers.ContractFactory.getContract(
                address,
                VaultAbi.abi,
                ether.getSigner(),
              )
              console.log(c.filters, c.queryFilter)

              // const filters = c.filters

              // console.log(
              //   'Approve: ',
              //   await erc20.approve(address, ethers.constants.MaxUint256),
              // )

              // console.log(
              //   'Stake: ',
              //   await c.stake(tokenAddress, 10, { gasLimit: 1000000 }),
              // )

              // console.log('ERC20: ', erc20)

              // console.log(await ether.getNetwork())

              // // console.log(await signer.getTransactionCount())
              // const c = await ether.getContract()

              // const account = await ether.getAccount()
              // console.log(account)
              // debugger
              // console.log(await c.owner())
              // console.log(
              //   // @ts-ignore
              //   await c.stake('0x0B84D4B9fE423CED62E1eF836B4aE8130E35604E', 1, {
              //     gasLimit: 1000000,
              //   }),
              // )
            } catch (e) {
              console.log('error----------------------')
              console.error(e)
            }
          }}
        />
      </span>
    </div>
  )
}
