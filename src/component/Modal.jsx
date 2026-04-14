import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, ModalContainer, ModalIconWrap, ModalTitle, Message, ModalButtons, ModalGhostBtn } from '../styles/modal_style'

const Modal = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Backdrop>
      <ModalContainer>
        <ModalIconWrap></ModalIconWrap>
        <ModalTitle>Success</ModalTitle>
        <Message>{children}</Message>
        <ModalButtons>
          <ModalGhostBtn onClick={() => { navigate(-1) }}>Ok</ModalGhostBtn>
        </ModalButtons>
      </ModalContainer>
    </Backdrop>
  )
}

export default Modal
