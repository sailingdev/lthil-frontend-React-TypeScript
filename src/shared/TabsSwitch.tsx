/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useState, MouseEventHandler } from 'react'

import { Txt } from './Txt'

interface ITab {
  title: string
  content: any
}

interface ITabsProps {
  className?: string | undefined
  items: ITab[]
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
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <div
        css={[
          tw`flex flex-row items-center gap-2 border-2 border-font-200 rounded-xl p-1 dark:border-primary-400`,
        ]}
      >
        {props.items.map((t, i) => (
          <TabButton
            text={t.title}
            active={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {props.items[activeIndex].content}
    </div>
  )
}
