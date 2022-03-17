/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { ICSSProps } from '../types'
import { MouseEventHandler } from 'react'
import { Txt } from './Txt'

interface IButtonProps extends ICSSProps {
  type?: any
  primary?: boolean | undefined
  action?: boolean | undefined
  full?: boolean | undefined
  leftIcon?: any
  rightIcon?: any
  text?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string | undefined
  bold?: boolean | undefined
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
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center justify-center h-9 max-h-9 tablet:h-10 tablet:max-h-10  desktop:h-11 desktop:max-h-11 px-2`,
        primary && tw`bg-primary-200`,
        props.action && tw`bg-action`,
        props.full && tw`w-full`,
      ]}
      onClick={props.onClick}
    >
      {LeftIcon && (
        <LeftIcon
          css={[
            primary && tw`text-secondary`,
            props.action && tw`text-primary-100`,
          ]}
          tw='mr-2'
          size={16}
        />
      )}
      {props.text && (
        <Txt.ButtonMedium
          css={[
            tw`flex-grow`,
            primary && tw`text-secondary`,
            props.action && tw`text-white`,
            props.bold && tw`font-bold`,
          ]}
        >
          {props.text}
        </Txt.ButtonMedium>
      )}
      {RightIcon && (
        <RightIcon
          css={[
            primary && tw`text-secondary`,
            props.action && tw`text-primary-100`,
          ]}
          tw='ml-2'
          size={16}
        />
      )}
    </button>
  )
}
