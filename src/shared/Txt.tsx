/** @jsxImportSource @emotion/react */

import React from 'react'
import tw from 'twin.macro'

interface ITxtProps {
  xs?: boolean | undefined
  sm?: boolean | undefined
  md?: boolean | undefined
  l?: boolean | undefined
  xl?: boolean | undefined
  xxl?: boolean | undefined
  xxxl?: boolean | undefined
  className?: string
}

const pickStyle = (props: ITxtProps) => {
  // if (props.xs) {
  //   // font-weight: 600; ['12px', '16px'],
  //   return tw`font-sans font-semibold text-xs text-gray-900`
  // } else if (props.sm) {
  //   // font-weight: 400; ['14px', '20px'],
  //   return tw`font-sans font-normal text-sm text-gray-900`
  // } else if (props.md) {
  //   // font-weight: 500; ['14px', '20px'],
  //   return tw`font-sans font-medium text-sm text-gray-900`
  // } else if (props.l) {
  //   // font-weight: 400; ['16px', '24px'],
  //   return tw`font-sans font-normal text-l text-gray-900`
  // } else if (props.xl) {
  //   // font-weight: 500; ['18px', '24px'],
  //   return tw`font-sans font-medium text-xl text-gray-900`
  // } else if (props.xxl) {
  //   // font-weight: 600; ['24px', '32px'],
  //   return tw`font-sans font-semibold text-2xl text-gray-900`
  // } else if (props.xxxl) {
  //   // font-weight: 800; ['30px', '36px'],
  //   return tw`font-sans font-extrabold text-3xl text-gray-900`
  // }
  // return tw`font-sans font-normal text-sm text-gray-900`
  return tw``
}
export const Txt: React.FC<ITxtProps> = (props) => {
  const style = pickStyle(props)
  return (
    <div css={style} className={props.className}>
      {props.children}
    </div>
  )
}
