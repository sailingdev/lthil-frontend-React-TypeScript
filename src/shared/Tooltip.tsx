import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { Question } from 'phosphor-react'
import ReactTooltip from 'react-tooltip'
import { Txt } from './Txt'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import tw from 'twin.macro'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const defaultStyles = css`
  ${tw`inline-block align-text-bottom`}
`
interface ITooltip {
  text: string
}

export const Tooltip = (props: ITooltip) => {
  const [id] = useState(uuidv4())

  return (
    <>
      <Question data-tip data-for={id} tw='text-font-200 dark:text-font-200' />
      {/* @ts-ignore */}
      <ReactTooltip
        id={id}
        type='info'
        backgroundColor='rgb(54, 65, 83)'
        place='right'
        effect='solid'
        clickable
      >
        <Txt.MobileMedium tw='text-white'>{props.text}</Txt.MobileMedium>
      </ReactTooltip>
    </>
  )
}
