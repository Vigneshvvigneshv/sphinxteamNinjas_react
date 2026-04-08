import React from 'react'
import { Backdrop, Button, CommonContainer, Container, Content, LoginContainer } from '../styles/common.style'
import { NavButton } from '../styles/header.style'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from '../styles/form.style'

const Modal = ({children}) => {
  const navigate=useNavigate();

  
  return (
    
    <Backdrop>
      <FormContainer>
      <Content>
        {children}
      </Content>
      <NavButton onClick={()=>{ navigate(-1)} }>Ok</NavButton>
      </FormContainer>
    </Backdrop>
    
  )
}

export default Modal
