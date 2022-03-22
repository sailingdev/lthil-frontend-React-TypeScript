/** @jsxImportSource @emotion/react */

import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'
import tw from 'twin.macro'

export const showErrorNotification = (text: string) =>
  toast(
    <div css={[tw`flex flex-row items-center p-0 m-0`]}>
      <div css={[tw`text-primary`]}>{text}</div>
    </div>,
    {
      className: 'toastify-error-container',
    },
  )
export const showInfoNotification = (text: string) =>
  toast(
    <div css={[tw`flex flex-row items-center p-0 m-0`]}>
      <div css={[tw`text-white`]}>{text}</div>
    </div>,
    {
      className: 'toastify-info-container',
    },
  )
