import 'twin.macro'

import { IBaseProps } from '../utils'
/** @jsxImportSource @emotion/react */
import Switch from 'react-switch'
import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'
import { ThemeContext } from '../AppRouter'
import { useContext } from 'react'

export const ThemeSwitch = (props: IBaseProps) => {
  // const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const { themeContext, setThemeContext } = useContext(ThemeContext)

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    setThemeContext(!themeContext)
  }

  return (
    <Switch
      className={props.className}
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
      checked={!themeContext}
      onColor='#F2F5F6'
      offColor='#20293A'
      onHandleColor='#FB8E51'
      offHandleColor='#F3E7A8'
    />
  )
}
