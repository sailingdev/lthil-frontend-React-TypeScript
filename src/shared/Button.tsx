/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { MouseEventHandler } from 'react'
import { ClipLoader } from 'react-spinners'

import { ICSSProps } from '../types'
import { Txt } from './Txt'

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
  bold?: boolean | undefined
  isLoading?: boolean
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const primary = !props.action
  const LeftIcon = props.leftIcon
  const RightIcon = props.rightIcon

  const onClickHandler = async (e: any) => {
    if (props.onClick && !props.isLoading) {
      await props.onClick(e)
    }
  }

  const disabled = props.isLoading
  return (
    <button
      type={props.type ?? 'button'}
      className={props.className}
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center justify-center h-9 tablet:h-10 desktop:h-11 px-2`,
        primary &&
          tw`bg-primary-200 hover:bg-hover-light dark:hover:bg-hover-dark`,
        props.action && tw`bg-action hover:bg-hover-action`,
        props.full && tw`w-full`,
        tw`disabled:bg-disabled-action`,
      ]}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {props.isLoading ? (
        <div tw='relative h-full flex items-center justify-center px-8'>
          <ClipLoader color={'#ffffff'} loading size={24} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </button>
  )
}
