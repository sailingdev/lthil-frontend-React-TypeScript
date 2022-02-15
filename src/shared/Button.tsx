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
  leftIcon?: any
  rightIcon?: any
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string | undefined
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const primary = !props.action
  const LeftIcon = props.leftIcon
  const RightIcon = props.rightIcon
  return (
    <button
      type={props.type ?? 'button'}
      className={props.className}
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center px-3 py-2.5`,
        primary && tw`bg-primary-200`,
        props.action && tw`bg-action`,
        props.full && tw`w-full`,
      ]}
      onClick={props.onClick}
    >
      {LeftIcon && (
        <LeftIcon size={16} color={primary ? '#070B0F' : '#F2F5F6'} tw='mr-2' />
      )}
      <Txt
        md
        css={[
          tw`flex-grow`,
          primary && tw`text-secondary-100`,
          props.action && tw`text-primary-100`,
        ]}
      >
        {props.text}
      </Txt>
      {RightIcon && (
        <RightIcon
          size={16}
          color={primary ? '#070B0F' : '#F2F5F6'}
          tw='ml-2'
        />
      )}
    </button>
  )
}
