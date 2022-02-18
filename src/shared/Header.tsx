import { useCallback, useState } from 'react'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ReactComponent as Logo } from '../assets/logoLight.svg'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'

export const Header = () => {
  return (
    <div tw='max-w-1920 w-[calc(100% - 9rem)] my-6 mx-auto flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        <Logo css={[tw`width[128px] height[32px]`]} />
        <span tw='mt-1 ml-24 flex flex-row'>
          <NavigationMenu />
          <ThemeSwitch />
        </span>
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrEth} rightIcon={ArrowDown} />
        <Button text='Connect wallet' action />
      </span>
    </div>
  )
}
