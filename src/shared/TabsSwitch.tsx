import { MouseEventHandler } from 'react'
import { PositionType } from '../types'
import { Txt } from './Txt'
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

interface ITab {
  title: string
  value: string
}

interface ITabsProps {
  className?: string | undefined
  items: ITab[]
  activeIndex: PositionType
  onChange: (value: PositionType) => void
}

const TabButton = (props: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean
}) => {
  return (
    <button
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center justify-center px-3 py-2`,
        tw`bg-none text-secondary w-1/2`,
        props.active && tw`bg-font-100 dark:bg-font`,
      ]}
      onClick={props.onClick}
    >
      <Txt.Body1Regular
        css={[
          tw`text-secondary`,
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
