/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { Txt } from './Txt'

export const Strategy = (props: {
  title: string
  description: string
  apyMin: string
  apyMax: string
  risk: string
  onClick?: any
}) => {
  const { title, description, apyMin, apyMax, risk, onClick } = props
  return (
    <div
      onClick={onClick}
      tw='rounded-xl bg-primary-200 flex flex-col justify-between p-5 w-full tablet:w-[300px] desktop:w-[356px] hover:bg-[rgba(150, 150, 150, 0.1)] cursor-pointer'
    >
      <Txt.Heading2 tw='text-secondary mb-2'>{title}</Txt.Heading2>
      <Txt.Body2Regular tw='text-font-200 mb-2 tablet:mb-12 w-9/12 h-14'>
        {description}
      </Txt.Body2Regular>
      <div tw='flex flex-row justify-between'>
        <Txt.Body2Bold tw='text-secondary'>
          APY: {apyMin} - {apyMax}
        </Txt.Body2Bold>
        <div tw='flex flex-row gap-3 items-center'>
          <Txt.CaptionMedium tw='text-secondary'>Risk:</Txt.CaptionMedium>
          <div
            css={[
              tw`rounded-md py-1 px-3`,
              risk === 'High' && tw`bg-error`,
              risk === 'Medium' && tw`bg-warning`,
              risk === 'Low' && tw`bg-success`,
            ]}
          >
            <Txt.CaptionMedium tw='text-primary'>{risk}</Txt.CaptionMedium>
          </div>
        </div>
      </div>
    </div>
  )
}
