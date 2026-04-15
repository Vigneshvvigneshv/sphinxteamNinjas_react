import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, ModalContainer, ModalIconWrap, ModalTitle, Message, ModalButtons, ModalGhostBtn, ModalPrimaryBtn } from '../styles/modal_style'
import { TiTick } from 'react-icons/ti';
import { FaTrash } from 'react-icons/fa';




const Modal = ({ children, title,type, onConfirm, onCancel, showConfirmButton = false }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) return onCancel();
    navigate(-1);
  };
  const icon=()=>{
    if(type==="success"){
      return <TiTick/>
    }else if(type==="delete"){
      return <FaTrash/>
    }else if(type==="edit"){
      return <FaPen/>
    }else{
      return <TiTick/>
    }
  }
  

  return (
    <>
      
      <Backdrop>
        <ModalContainer>
          <ModalIconWrap>{icon()}</ModalIconWrap>
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
