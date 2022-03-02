import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ReactComponent as LogoLight } from '../assets/logoLight.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { ether } from '../ether'
import tw from 'twin.macro'
import { useState } from 'react'

export const Header = () => {
  const [web3Modal] = useState(
    new Web3Modal({
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
      },
    }),
  )
  const [connected, setConnected] = useState(() => !!web3Modal.cachedProvider)
  console.log(connected)

  // useAsync here
  // useEffect(async ()=>{
  //   const provider = await web3Modal.connect()
  //   setConnected(true)

  //   console.log('provider:', provider)
  //   await ether.initializeProvider(provider)

  // }, [])

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
          text={`Connect wallet`}
          action
          onClick={async () => {
            // if (connected) {
            //   await web3Modal.clearCachedProvider()
            //   return window.location.reload()
            // }
            try {
              const provider = await web3Modal.connect()
              setConnected(true)
              debugger

              console.log('provider:', provider)
              await ether.initializeProvider(provider)
              const signer = ether.getSigner()
              console.log(await signer.getBalance())

              console.log(await ether.getNetwork())

              // console.log(await signer.getTransactionCount())
              const c = await ether.getContract()

              // const account = await ether.getAccount()
              // console.log(account)
              // debugger
              // console.log(await c.owner())
              console.log(
                // @ts-ignore
                await c.stake('0x0B84D4B9fE423CED62E1eF836B4aE8130E35604E', 1, {
                  gasLimit: 1000000,
                }),
              )
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
