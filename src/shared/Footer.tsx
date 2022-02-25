/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { NavigationMenu } from './NavigationMenu'
import { ThemeSwitch } from './ThemeSwitch'

export const Footer = () => {
  return (
    <div tw='w-full flex justify-center items-center'>
      <div tw='flex flex-row items-start justify-center'>
        <span tw='mt-1 flex flex-row'>
          <NavigationMenu />
          <ThemeSwitch />
        </span>
      </div>
    </div>
  )
}
