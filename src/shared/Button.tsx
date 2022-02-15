import { ICSSProps } from '../types'
/** @jsxImportSource @emotion/react */
import { MouseEventHandler } from 'react'
import { Txt } from './Txt'
import tw from 'twin.macro'

interface IButtonProps extends ICSSProps {
  type?: any
  primary?: boolean | undefined
  action?: boolean | undefined
  full?: boolean | undefined
  flat?: boolean | undefined
  order?: 'iconleft' | 'iconright'
  icon?: any
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string | undefined
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const primary = !props.action && !props.flat
  const order = !props.order ? 'iconleft' : props.order
  const Icon = props.icon
  return (
    <button
      type={props.type ?? 'button'}
      className={props.className}
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center px-3 py-2.5`,
        primary && tw`bg-primary  hover:bg-primary-300`,
        props.action &&
          tw`bg-action  hover:bg-primary-200  border-primary-200 border-0`,
        props.flat && tw`bg-none`,
        props.full && tw`w-full`,
      ]}
      onClick={props.onClick}
    >
      {Icon && (
        <Icon width={20} color={primary ? 'white' : '#39749B'} tw='mr-3' />
      )}
      <Txt
        md
        css={[
          tw`flex-grow`,
          // primary && tw`text-white`,
          // props.light && tw`text-primary-700`,
          // props.cancel && tw`text-gray-700`,
          // props.flat && tw`text-gray-500`,
        ]}
      >
        {props.text}
      </Txt>
    </button>
  )
}
