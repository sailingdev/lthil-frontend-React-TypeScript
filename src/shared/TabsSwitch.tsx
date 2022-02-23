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

const Button = (props: {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean
}) => {
  return (
    <button
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center justify-center px-3 py-2`,
        tw`bg-none text-secondary w-1/2`,
        props.active && tw`bg-secondary-200`,
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
          tw`flex flex-row items-center gap-2 border-2 border-secondary-200 rounded-xl p-1`,
          document.documentElement.classList.contains('dark') && // TODO: This works only after you switch the theme AND click a button in this component (only when you switch the theme for the first time, later it works perfectly...), so it doesn't update automatically. This needs to be fixed
            tw`border-primary-400`,
        ]}
      >
        {props.items.map((t, i) => (
          <Button
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
