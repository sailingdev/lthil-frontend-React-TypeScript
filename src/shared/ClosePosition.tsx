/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { Button } from './TransactionButton'
import { Txt } from '../shared/Txt'

interface IClosePosition {
  token: string
  value: number
  onClick: () => void
}

export const ClosePosition = (props: IClosePosition) => {
  const { token, value, onClick } = props

  return (
    <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100 gap-5'>
      <div tw='w-full flex flex-row justify-between'>
        <Txt.Body2Regular tw='text-secondary'>Position Value</Txt.Body2Regular>
        <Txt.Body2Bold tw='text-secondary'>
          {value} {token}
        </Txt.Body2Bold>
      </div>
      <Button
        tw='bg-primary-100 border-font-200 border'
        text='Close position'
        bold
        full
        onClick={onClick}
      />
    </div>
  )
}
