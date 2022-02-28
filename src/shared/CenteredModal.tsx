/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'
import { useState, ReactNode } from 'react'
import Modal from 'react-modal'
import { X, MagnifyingGlass } from 'phosphor-react'

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
      tw='sticky z-50 overflow-hidden w-screen h-screen bg-primary-100 top-1/2 left-1/2 marginRight[-50%] transform[translate(-50%, -50%)] flex flex-col justify-center items-center fixed desktop:rounded-xl p-4 desktop:min-width[400px] desktop:min-height[64px] desktop:max-width[50%]  desktop:w-auto desktop:h-auto pt-5'
      isOpen={isOpen}
      contentLabel=''
    >
      {children}
      {/* <Button text='Close modal' onClick={closeModal} /> */}
      <button
        css={[
          tw`bg-secondary border-0 rounded-md cursor-pointer px-2.5 py-2.5 bg-primary-100 width[36px] height[36px] mx-1 absolute right-2 top-4`,
          // active && tw`bg-action text-primary-100`,
        ]}
        onClick={() => props.onChange(false)}
      >
        <X tw='text-secondary dark:text-secondary-300' />
      </button>
    </Modal>
  )
}
