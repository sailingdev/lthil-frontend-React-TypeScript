/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import tw from 'twin.macro'
import Switch from 'react-switch'
import { Button } from './Button'
import { ArrowDown } from 'phosphor-react'

import { NavigationMenu } from './NavigationMenu'
import { ReactComponent as Logo } from '../assets/logoLight.svg'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'
import { Txt } from './Txt'

export const Header = () => {
  const [isLightMode, setLightMode] = useState(true)

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    setLightMode(!isLightMode)
    // checked
    //   ? (document.getElementById('svg-logo-text')!.style.fill = '#F2F5F6')
    //   : (document.getElementById('svg-logo-text')!.style.fill = '#2A333C')
  }

  return (
    <div tw='max-w-1920 w-[calc(100% - 3rem)] my-6 mx-auto flex flex-row items-start justify-between'>
      <span tw='flex flex-row items-start'>
        <Logo css={[tw`width[128px] height[32px]`]} />
        <span tw='mt-1 ml-24'>
          <NavigationMenu />
        </span>
        <Switch
          css={[tw`mt-1`]}
          onChange={onThemeChange}
          uncheckedIcon={
            <div tw='flex justify-center items-center height[100%]'>
              <SwitchDark />
            </div>
          }
          checkedIcon={
            <div tw='flex justify-center items-center height[100%]'>
              <SwitchLight />
            </div>
          }
          checked={isLightMode}
          onColor='#F2F5F6'
          offColor='#20293A'
          onHandleColor='#FB8E51'
          offHandleColor='#F3E7A8'
        />
      </span>
      <span tw='flex flex-row items-center gap-2'>
        <Button text='Ethereum' leftIcon={CurrEth} rightIcon={ArrowDown} />
        <Button text='Connect wallet' action />
        <Txt.CaptionMedium>TODO:menu</Txt.CaptionMedium>
      </span>
    </div>
  )
}
