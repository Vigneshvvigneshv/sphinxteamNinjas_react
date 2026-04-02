import React from 'react'
import { Backdrop } from '../styles/common.style'

const Modal = ({children}) => {
  return (
    <Backdrop>
        {children}
    </Backdrop>
  )
}

export default Modal
