/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { MouseEventHandler } from 'react'

import { PositionType } from '../types'
import { Txt } from './Txt'

interface ITab {
  title: string
  value: string
  icon?: any
}

interface ITabsProps {
  className?: string | undefined
  items: ITab[]
  activeIndex: string
  onChange: (value: string) => void
}

const TabButton = (props: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean
  icon?: any
}) => {
  const Icon = props.icon
  return (
    <button
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center justify-center px-3 py-2`,
        tw`bg-none text-secondary w-1/2`,
        props.active && tw`bg-font-100 dark:bg-font`,
      ]}
      onClick={props.onClick}
    >
      {Icon && <Icon />}
      <Txt.Body1Regular
        css={[
          tw`text-secondary`,
          Icon && tw`ml-2`,
          props.active && tw`text-primary-100 font-bold`,
        ]}
      >
        {props.text}
      </Txt.Body1Regular>
    </button>
  )
}

export const TabsSwitch = (props: ITabsProps) => {
  const { activeIndex, onChange } = props

  return (
    <div tw='w-full'>
      <div
        css={[
          tw`flex flex-row items-center gap-2 border-2 border-font-200 rounded-xl p-1 dark:border-primary-400`,
        ]}
      >
        {props.items.map((tab) => (
          <TabButton
            key={tab.value}
            icon={tab.icon}
            text={tab.title}
            active={tab.value == activeIndex}
            onClick={() => onChange(tab.value as PositionType)}
          />
        ))}
      </div>

      {/* {props.items[activeIndex].content} */}
    </div>
  )
}
