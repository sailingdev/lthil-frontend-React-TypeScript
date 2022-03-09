import 'twin.macro'

import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/images/currencyEthereum.svg'
import { ReactComponent as MetaMaskLogo } from '../assets/images/metamask.svg'
import { ReactComponent as LogoDark } from '../assets/images/logoDark.svg'
import { ReactComponent as LogoLight } from '../assets/images/logoLight.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import { WalletModal } from './WalletModal'
import tw from 'twin.macro'
import { useState } from 'react'
import { useTheme } from '../state/hooks'
import { WalletIndicator } from './WalletIndicator'

import { useAccountAddress } from '../state/hooks'

/** @jsxImportSource @emotion/react */

export const Header = () => {
  const theme = useTheme()
  const address = useAccountAddress()

  const [isOpenWallet, setIsOpenWallet] = useState(false)

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

        {address ? (
          <WalletIndicator
            currency='ETH'
            address='0x4678820caa137EE5FDcE601E1963a3b487d8F1f4'
            amount='0.9999572385'
            providerIcon={<MetaMaskLogo />}
          />
        ) : (
          <Button
            // text={connected ? 'Disconnect' : `Connect wallet`}
            text='Connect'
            action
            onClick={() => setIsOpenWallet(true)}
          />
        )}
      </span>
      <WalletModal
        modalIsOpen={isOpenWallet}
        onClose={() => setIsOpenWallet(false)}
      />
    </div>
  )
}
