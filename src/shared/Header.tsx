import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ReactComponent as LogoLight } from '../assets/logoLight.svg'
import { ReactComponent as LogoDark } from '../assets/logoDark.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useLocalStorage } from 'react-use'

// import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { ether } from '../ether'
import tw from 'twin.macro'

export const Header = () => {
  return (
    <div tw='max-w-1920 w-[calc(100% - 9rem)] my-6 mx-auto flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        <LogoLight css={[tw`w-32 h-8`]} />
        <span tw='mt-1 ml-24 flex flex-row'>
          <NavigationMenu />
          <ThemeSwitch />
        </span>
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrEth} rightIcon={ArrowDown} />
        <Button
          text='Connect wallet'
          action
          onClick={async () => {
            try {
              const web3Modal = new Web3Modal({
                network: 'kovan',
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
                },
              })

              const provider = await web3Modal.connect()
              provider.on('accountsChanged', (accounts: string[]) => {
                console.log(accounts)
              })

              // Subscribe to chainId change
              provider.on('chainChanged', (chainId: number) => {
                console.log(chainId)
              })

              // Subscribe to provider connection
              provider.on('connect', (info: { chainId: number }) => {
                console.log(info)
              })

              // Subscribe to provider disconnection
              provider.on(
                'disconnect',
                (error: { code: number; message: string }) => {
                  console.log(error)
                },
              )
              console.log('provider:', provider)
              await ether.initializeProvider(provider)
              const signer = ether.getSigner()
              console.log(await signer.getBalance())
              console.log(await ether.getAccount())

              console.log(await signer.getTransactionCount())
              const c = await ether.getContract()
              console.log(c)
            } catch (e) {
              console.log('error----------------------')
              console.log(e)
            }
          }}
        />
      </span>
    </div>
  )
}
