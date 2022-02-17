/** @jsxImportSource @emotion/react */
import { MouseEventHandler } from 'react'
import { Txt } from './Txt'
import tw from 'twin.macro'
import { ICSSProps } from '../types'

import { NavigationMenu } from './NavigationMenu'
import Logo from '../assets/logo_dark.svg'
import CurrencyLogo from '../assets/currencyLogo.jpg' // COMMENT: This is a jpg exported from figma, not sure if this is how we want to use it? We'd need to make some modifications to Button component I think
import { Button } from './Button'
import { ArrowDown, CurrencyEth } from 'phosphor-react'

// interface IButtonProps extends ICSSProps {
//   type?: any
//   primary?: boolean | undefined
//   action?: boolean | undefined
//   full?: boolean | undefined
//   leftIcon?: any
//   rightIcon?: any
//   text: string
//   onClick?: MouseEventHandler<HTMLButtonElement>
//   className?: string | undefined
// }

export const Header = () => {
  return (
    <div tw='flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        <img tw='height[32px] mr-24' src={Logo} alt='logo image' />
        <span tw='mt-1'>
          <NavigationMenu />
        </span>
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrencyEth} rightIcon={ArrowDown} />
        <Button text='Connect wallet' action />
        TODO:menu
      </span>
    </div>
  )
}
