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
import Web3Modal from 'web3modal'
import { ether } from '../ether'
import tw from 'twin.macro'
import { useState, useContext } from 'react'
import { ThemeContext } from '../AppRouter'

export const Header = () => {
  const { themeContext, setThemeContext } = useContext(ThemeContext)

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

  const [web3Modal] = useState(
    new Web3Modal({
      network: 'kovan',
      cacheProvider: true,
      theme: themeContext ? darkTheme : lightTheme,
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
        {themeContext ? (
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
          text={connected ? 'Disconnect wallet' : `Connect wallet`}
          action
          onClick={async () => {
            if (connected) {
              await web3Modal.clearCachedProvider()
              return window.location.reload()
            }
            try {
              const provider = await web3Modal.connect()
              setConnected(true)

              console.log('provider:', provider)
              await ether.initializeProvider(provider)
              const signer = ether.getSigner()
              console.log(await signer.getBalance())

              // console.log(await signer.getTransactionCount())
              // const c = await ether.getContract()

              // const account = await ether.getAccount()
              // console.log(account)
              // debugger
              // // @ts-ignore
              // console.log(await c.owner())
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
