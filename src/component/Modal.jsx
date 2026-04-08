import React from 'react'
import {  Button, ButtonContainer, CommonContainer, Container, Content, LoginContainer } from '../styles/common.style'
import { NavButton } from '../styles/header.style'
import { useNavigate } from 'react-router-dom'
import { Backdrop, Message, ModalContainer } from '../styles/modal.style'

const Modal = ({children}) => {
  const navigate=useNavigate();

  
  return (
    
    <Backdrop>
      <ModalContainer>
      <Message>
        {children}
      </Message>
      <ButtonContainer>
       <NavButton onClick={()=>{ navigate(-1)} }>Ok</NavButton>
      </ButtonContainer>
      </ModalContainer>
    </Backdrop>
    
  )
}

export default Modal
