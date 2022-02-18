/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import tw from 'twin.macro'
import Switch from 'react-switch'

import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'

export const ThemeSwitch = () => {
  const [isLightMode, setLightMode] = useState(true)

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    setLightMode(!isLightMode)
  }

  return (
    <Switch
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
  )
}
