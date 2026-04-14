import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, ModalContainer, ModalIconWrap, ModalTitle, Message, ModalButtons, ModalGhostBtn, ModalPrimaryBtn } from '../styles/modal_style'
import { createGlobalStyle } from 'styled-components'

const ScrollLock = createGlobalStyle`
  body {
    overflow: hidden !important;
  }
`;

const Modal = ({ children, title = "Success", onConfirm, onCancel, showConfirmButton = false }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) return onCancel();
    navigate(-1);
  };

  return (
    <>
      <ScrollLock />
      <Backdrop>
        <ModalContainer>
          <ModalIconWrap></ModalIconWrap>
          <ModalTitle>{title}</ModalTitle>
          <Message>{children}</Message>
          <ModalButtons>
            {showConfirmButton && <ModalPrimaryBtn onClick={onConfirm} style={{ background: '#e11d48' }}>Delete</ModalPrimaryBtn>}
            <ModalGhostBtn onClick={handleCancel}>{showConfirmButton ? "Cancel" : "Ok"}</ModalGhostBtn>
          </ModalButtons>
        </ModalContainer>
      </Backdrop>
    </>
  )
}

export default Modal
