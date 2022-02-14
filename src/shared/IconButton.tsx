import { ICSSProps } from '../types'
/** @jsxImportSource @emotion/react */
import { MouseEventHandler } from 'react'
import tw from 'twin.macro'

interface IIconButtonProps extends ICSSProps {
  type?: any
  primary?: boolean | undefined
  light?: boolean | undefined
  cancel?: boolean | undefined
  full?: boolean | undefined
  flat?: boolean | undefined
  icon: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string | undefined
}

export const IconButton: React.FC<IIconButtonProps> = (
  props: IIconButtonProps,
) => {
  const primary = !props.light && !props.cancel && !props.flat
  const Icon = props.icon
  return (
    <button
      type={props.type ?? 'button'}
      className={props.className}
      css={[
        tw`border-0 rounded-3xl cursor-pointer flex flex-row items-center p-2.5`,
        // primary && tw`bg-primary-600  hover:bg-primary-700`,
        // props.light &&
        //   tw`bg-primary-100  hover:bg-primary-200  border-gray-200 border-0`,
        // props.cancel &&
        //   tw`bg-white hover:bg-gray-50 border-gray-200 border-width[1.5px]`,
        // props.flat && tw`bg-none`,
        // props.full && tw`w-full`,
      ]}
      onClick={props.onClick}
    >
      <Icon
        width={20}
        tw='h-5 w-5'
        color={primary ? 'white' : props.light ? '#1E4968' : '#6B7280'}
      />
    </button>
  )
}
