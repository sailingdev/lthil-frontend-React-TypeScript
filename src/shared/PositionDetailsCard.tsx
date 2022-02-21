/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

import { isMobile, isTablet, isDesktop } from '../utils'
import { Txt } from './Txt'

const ElementText = (props: { value: string | number }) => {
  return isDesktop ? (
    <Txt.Body2Regular tw='text-secondary'>{props.value}</Txt.Body2Regular>
  ) : (
    <Txt.Body1Regular tw='text-secondary'>{props.value}</Txt.Body1Regular>
  )
}

const InformationElement = (props: {
  title: string
  value1?: string | number
  value2?: string | number
  value2Color?: 'black' | 'green' | 'red'
}) => {
  const { title, value1, value2, value2Color } = props
  return (
    <div tw='flex flex-row justify-between'>
      <ElementText value={title} />
      <div tw='flex flex-row gap-2'>
        {value1 && <ElementText value={value1} />}
        {value2 && (
          <Txt.Body2Bold
            css={[
              tw`text-secondary ml-2`,
              value2Color === 'green' && tw`text-success`,
              value2Color === 'red' && tw`text-error`,
            ]}
          >
            {value2}
          </Txt.Body2Bold>
        )}
      </div>
    </div>
  )
}

export const PositionDetailsCard = () => {
  return (
    <div tw='flex flex-col justify-between items-center width[432px] rounded-xl p-5 bg-primary-100'>
      <Txt.Heading2>Position details</Txt.Heading2>
      <div tw='flex flex-col justify-between w-full px-2 mt-6 gap-2'>
        <InformationElement
          title='Position'
          value1={'ETH 2x Long'}
          value2={'2.00'}
        />
        <InformationElement
          title='Open price'
          value1={'USDC'}
          value2={'3.129'}
        />
        <InformationElement
          title='Profit'
          value2={'$ +1.240,00 (+15.6%)'}
          value2Color='green'
        />
      </div>
    </div>
  )
}
