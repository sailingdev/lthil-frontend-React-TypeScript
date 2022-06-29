/** @jsxImportSource @emotion/react */
import 'twin.macro'

import Switch from 'react-switch'

import { useTheme, useToggleTheme } from '../state/hooks'
import { IBaseProps } from '../types'
import { ReactComponent as SwitchDark } from '../assets/images/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/images/switchLight.svg'

export const ThemeSwitch = (props: IBaseProps) => {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()

  return (
    // @ts-ignore
    <Switch
      className={props.className}
      onChange={toggleTheme}
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
      checked={!theme}
      onColor='#F2F5F6'
      offColor='#20293A'
      onHandleColor='#FB8E51'
      offHandleColor='#F3E7A8'
    />
  )
}
