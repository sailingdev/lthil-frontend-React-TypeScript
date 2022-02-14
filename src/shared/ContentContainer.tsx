import { FC } from 'react'
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

export const ContentContainer: FC = ({ children }: any) => {
  return (
    <div css={[tw`max-w-1920 w-[calc(100% - 3rem)] my-6 mx-auto`]}>
      {children}
    </div>
  )
}
