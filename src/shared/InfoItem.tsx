/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { isDesktop } from '../utils'
import { Txt } from './Txt'

const InfoItemText = (props: { value: string | number }) => {
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{props.value}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{props.value}</Txt.Body1Regular>
  )
}

export const InfoItem = (props: {
  label: string
  details?: string
  value: string | number | undefined
  valueColor?: 'black' | 'red' | 'green'
}) => {
  const { label, details, value, valueColor } = props
  return (
    <div tw='flex flex-row justify-between w-full'>
      <InfoItemText value={label} />
      <div tw='flex flex-row gap-2'>
        {details && <InfoItemText value={details} />}
        {value && (
          <Txt.Body2Bold
            css={[
              tw`text-secondary ml-2`,
              valueColor === 'green' && tw`text-success`,
              valueColor === 'red' && tw`text-error`,
            ]}
          >
            {value}
          </Txt.Body2Bold>
        )}
      </div>
    </div>
  )
}
