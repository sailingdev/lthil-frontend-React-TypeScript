/** @jsxImportSource @emotion/react */

import { IBaseProps } from '../utils'
import React from 'react'
import tw from 'twin.macro'

const InnerText: React.FC<IBaseProps> = (props) => {
  return <div className={props.className}>{props.children}</div>
}

export const Txt: { [key: string]: React.FC<IBaseProps> } = {
  CaptionMedium: (props) => (
    <InnerText
      {...props}
      css={[tw`text-error`, tw`tablet:font-bold`, tw`desktop:text-success`]}
    />
  ),
}
