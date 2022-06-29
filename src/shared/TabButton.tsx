/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { Txt } from '../shared/Txt'
export const TabButton = (props: {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  active?: boolean
  className?: string | undefined
}) => {
  return (
    <button
      css={[
        tw`bg-primary-300 border-0 rounded-md cursor-pointer flex flex-row items-center px-8 py-2.5`,
        props.active && tw`bg-action`,
      ]}
      className={props.className}
      onClick={props.onClick}
    >
      <Txt.Body2Regular
        css={[tw`text-secondary`, props.active && tw`text-primary-100`]}
      >
        {props.text}
      </Txt.Body2Regular>
    </button>
  )
}
