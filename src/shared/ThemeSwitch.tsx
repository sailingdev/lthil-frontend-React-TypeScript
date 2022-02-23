/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import tw from 'twin.macro'
import { useEffect } from 'react'
import Switch from 'react-switch'

import useLocalStorage from './hooks/useLocalStorage'
import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'

export const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  return (
    <Switch
      // tw='mt-1'
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
      checked={!darkMode}
      onColor='#F2F5F6'
      offColor='#20293A'
      onHandleColor='#FB8E51'
      offHandleColor='#F3E7A8'
    />
  )
}
