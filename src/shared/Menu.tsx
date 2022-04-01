/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { Txt } from './Txt'
import {
  DotsThree,
  GithubLogo,
  Info,
  BookOpen,
  DiscordLogo,
} from 'phosphor-react'
import { useOutsideAlerter } from './hooks/useOutsideAlerter'
import { useState, useRef } from 'react'

const MenuItem = (props: { icon: any; label: string; url: string }) => {
  const { icon, label, url } = props
  const Icon = icon
  return (
    <div tw='flex justify-start items-center gap-3'>
      <Icon tw='text-secondary-100' />
      <a href={url} target='_blank' rel='noreferrer'>
        <Txt.Body2Regular tw='text-secondary-100'>{label}</Txt.Body2Regular>
      </a>
    </div>
  )
}

interface IMenu {
  menuIsOpen: boolean
  onMenuChange: (state: boolean) => void
}

export const Menu = (props: IMenu) => {
  const { menuIsOpen, onMenuChange } = props

  const divRef = useRef(null)
  useOutsideAlerter(divRef, () => {
    if (menuIsOpen) {
      onMenuChange(false)
    }
  })

  return (
    <>
      <div ref={divRef}>
        <div
          onClick={() => onMenuChange(!menuIsOpen)}
          tw='border-0 rounded-md cursor-pointer h-9 tablet:h-10 desktop:h-11 w-9 tablet:w-10 desktop:w-11 px-2 bg-primary-200 relative flex justify-center items-center'
        >
          <DotsThree tw='text-secondary' size={24} />
        </div>
        {menuIsOpen && (
          <div
            // onClick={(e) => e.stopPropagation()}
            tw='border-0 rounded-md cursor-pointer flex flex-col justify-start gap-3 py-4 pr-16 pl-4 bg-primary-200 absolute top[70px] right[20px] tablet:top-20 tablet:right[20px] desktop:top-20 desktop:right[92px]'
          >
            <MenuItem icon={Info} label='About' url='https://www.google.com' />
            <MenuItem
              icon={BookOpen}
              label='Docs'
              url='https://www.google.com'
            />
            <MenuItem
              icon={GithubLogo}
              label='Source'
              url='https://www.google.com'
            />
            <MenuItem
              icon={DiscordLogo}
              label='Discord'
              url='https://www.google.com'
            />
          </div>
        )}
      </div>
    </>
  )
}
