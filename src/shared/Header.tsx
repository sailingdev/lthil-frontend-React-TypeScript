import 'twin.macro'

import { isDesktop, isTablet } from '../utils'

import { AccountModal } from './AccountModal'
import { Button } from './Button'
import { CaretDown } from 'phosphor-react'
import { ReactComponent as CurrEth } from '../assets/images/currencyEthereum.svg'
import { ReactComponent as LogoFullDark } from '../assets/images/logoFullDark.svg'
import { ReactComponent as LogoFullLight } from '../assets/images/logoFullLight.svg'
import { ReactComponent as LogoSymbolDark } from '../assets/images/logoSymbolDark.svg'
import { ReactComponent as LogoSymbolLight } from '../assets/images/logoSymbolLight.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import { WalletIndicator } from './WalletIndicator'
import { WalletModal } from './WalletModal'
import { useIsConnected } from './hooks/useIsConnected'
import { useState } from 'react'
import { useTheme } from '../state/hooks'

/** @jsxImportSource @emotion/react */

export const Header = () => {
  const theme = useTheme()
  const isConnected = useIsConnected()
  const [isOpenWallet, setIsOpenWallet] = useState(false)
  const [isOpenAccount, setIsOpenAccount] = useState(false)

  return (
    <div tw='w-full px-5 desktop:w-[calc(100% - 9rem)] my-6 tablet:mx-auto flex flex-row items-center justify-between'>
      <span tw='flex flex-row items-center'>
        {theme ? (
          isDesktop ? (
            <LogoFullDark />
          ) : (
            <LogoSymbolDark />
          )
        ) : isDesktop ? (
          <LogoFullLight />
        ) : (
          <LogoSymbolLight />
        )}
        {isDesktop && (
          <span tw='ml-24 flex flex-row items-center'>
            <NavigationMenu />
            <ThemeSwitch />
          </span>
        )}
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button
          text={isTablet ? 'Ethereum' : ''}
          leftIcon={CurrEth}
          rightIcon={CaretDown}
        />

        {isConnected ? (
          <div onClick={() => setIsOpenAccount(true)}>
            <WalletIndicator tw='cursor-pointer' />
          </div>
        ) : (
          <Button text='Connect' action onClick={() => setIsOpenWallet(true)} />
        )}
        {/* <button tw='border-0 rounded-md cursor-pointer flex flex-row items-center justify-center h-9 tablet:h-10 desktop:h-11 w-9 tablet:w-10 desktop:w-11 px-2 bg-primary-200 dark:text-secondary'>
          <DotsThree size={24} />
        </button> */}
      </span>
      <WalletModal
        modalIsOpen={isOpenWallet}
        onClose={() => setIsOpenWallet(false)}
      />
      <AccountModal
        modalIsOpen={isOpenAccount}
        onClose={() => setIsOpenAccount(false)}
      />
    </div>
  )
}
