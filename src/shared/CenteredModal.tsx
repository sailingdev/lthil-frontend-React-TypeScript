/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { useState } from 'react'
import Modal from 'react-modal'

import { Button } from './Button'
import { isDesktop } from '../utils'
import { Txt } from './Txt'

Modal.setAppElement('#root')

export const CenteredModal = (props: {
  modalIsOpen: boolean
  onChange: (st: boolean) => void
  children: any
}) => {
  const handleCloseEvent = () => {
    props.onChange(false)
  }
  return (
    <Modal
      isOpen={props.modalIsOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      // style={customStyles}
      contentLabel='Example Modal'
    >
      <Button text='Close modal' onClick={handleCloseEvent} />
      {props.children}
    </Modal>
  )
}
