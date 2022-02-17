/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import tw from 'twin.macro'

import { NavigationMenu } from './NavigationMenu'
import { ReactComponent as Logo } from '../assets/logoLight.svg'
import { Button } from './Button'
import { ArrowDown } from 'phosphor-react'
import Switch from 'react-switch'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'

export const Header = () => {
  const [checked, setChecked] = useState(true)

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    setChecked(!checked)
    checked
      ? (document.getElementById('svg-logo-text')!.style.fill = '#F2F5F6')
      : (document.getElementById('svg-logo-text')!.style.fill = '#2A333C')
  }

  return (
    <div tw='flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        <Logo tw='width[128px] height[32px]' />
        <span tw='mt-1'>
          <NavigationMenu />
        </span>
        <Switch
          css={[tw`mt-1`]}
          onChange={onThemeChange}
          uncheckedIcon={false}
          checkedIcon={false}
          checked={checked}
          onColor='#F2F5F6'
          offColor='#20293A'
          onHandleColor='#FB8E51'
          offHandleColor='#F3E7A8'
        />
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrEth} rightIcon={ArrowDown} />
        <Button text='Connect wallet' action />
        TODO:menu
      </span>
    </div>
  )
}
