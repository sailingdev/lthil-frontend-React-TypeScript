/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'
import { Txt } from './Txt'

export const Footer = () => {
  return (
    <div tw='w-full flex justify-center items-center'>
      <div tw='flex flex-row items-start justify-center'>
        <NavigationMenu />
        <ThemeSwitch />
      </div>
    </div>
  )
}
