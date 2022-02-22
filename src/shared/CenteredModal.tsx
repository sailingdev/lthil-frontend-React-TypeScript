/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useState, ReactNode } from 'react'
import Modal from 'react-modal'

import { Button } from './Button'
import { isDesktop } from '../utils'
import { Txt } from './Txt'

Modal.setAppElement('#root')

export const CenteredModal = (props: {
  isOpen: boolean
  onChange: (st: boolean) => void
  children: ReactNode
}) => {
  const { isOpen, onChange, children } = props

  const closeModal = () => {
    onChange(false)
  }
  return (
    <Modal
      tw='top-1/2 left-1/2 marginRight[-50%] transform[translate(-50%, -50%)] bg-primary flex flex-col justify-center items-center sticky desktop:rounded-xl desktop:border-2 p-4 desktop:min-width[256px] desktop:min-height[64px] desktop:max-width[50%] desktop:border-primary-300 desktop:w-auto desktop:h-auto'
      isOpen={isOpen}
      contentLabel='Example Modal'
    >
      {children}
      <Button text='Close modal' onClick={closeModal} />
    </Modal>
  )
}
