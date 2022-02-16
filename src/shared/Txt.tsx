/** @jsxImportSource @emotion/react */

import { IBaseProps } from '../utils'
import React from 'react'
import tw from 'twin.macro'

export interface ITxtProps extends IBaseProps {
  children: any
}

const InnerText: React.FC<IBaseProps> = (props) => {
  return <div className={props.className}>{props.children}</div>
}

export const Txt = {
  CaptionMedium: (props: ITxtProps) => (
    <InnerText
      {...props}
      css={[tw`text-error`, tw`tablet:font-bold`, tw`desktop:text-success`]}
    />
  ),
}
