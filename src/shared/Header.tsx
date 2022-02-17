import { useCallback, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { ArrowDown } from 'phosphor-react'
import { Button } from './Button'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { ReactComponent as Logo } from '../assets/logoLight.svg'
import { NavigationMenu } from './NavigationMenu'
import Switch from 'react-switch'
import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'
import tw from 'twin.macro'

export const Header = () => {
  const [isLightMode, setLightMode] = useState(true)

  const onThemeChange = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setLightMode(!isLightMode)
  }, [isLightMode])

  return (
    <div tw='max-w-1920 w-[calc(100% - 9rem)] my-6 mx-auto flex flex-row items-start justify-between'>
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
      </span>
    </div>
  )
}
