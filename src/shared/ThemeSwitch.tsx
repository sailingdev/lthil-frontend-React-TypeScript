import 'twin.macro'

import { useDispatch, useSelector } from 'react-redux'

import { IBaseProps } from '../utils'
import { RootState } from '../state/store'
/** @jsxImportSource @emotion/react */
import Switch from 'react-switch'
import { ReactComponent as SwitchDark } from '../assets/switchDark.svg'
import { ReactComponent as SwitchLight } from '../assets/switchLight.svg'
import { toggle } from '../state/theme/theme.actions'

export const ThemeSwitch = (props: IBaseProps) => {
  const theme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch<any>()

  const onThemeChange = () => {
    document.documentElement.classList.toggle('dark')
    dispatch(toggle())
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
      checked={!theme}
      onColor='#F2F5F6'
      offColor='#20293A'
      onHandleColor='#FB8E51'
      offHandleColor='#F3E7A8'
    />
  )
}
