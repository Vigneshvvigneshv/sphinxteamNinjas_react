import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Backdrop, ModalContainer, ModalIconWrap, ModalTitle, Message, ModalButtons, ModalGhostBtn, ModalPrimaryBtn } from '../styles/modal_style'
import { TiTick } from 'react-icons/ti';
import { FaPen, FaTrash } from 'react-icons/fa';




const Modal = ({ children, title,type='success', onConfirm, onCancel, showConfirmButton = false }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) return onCancel();
    navigate(-1);
  };
  const icon=()=>{
    if(type==="success"){
      return <TiTick style={{ color:'green'}}/>
    }else if(type==="delete"){
      return <FaTrash style={{ color:'red'}}/>
    }else if(type==="edit"){
      return <FaPen style={{color:'blue'}}/>
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
            {showConfirmButton && <ModalPrimaryBtn onClick={onConfirm} style={{ background: `${type==='delete'?"#e11d48":"blue"}` }}>{type==='delete'?'Delete':'Save'}</ModalPrimaryBtn>}
            <ModalGhostBtn onClick={handleCancel}>{showConfirmButton ? "Cancel" : "Ok"}</ModalGhostBtn>
          </ModalButtons>
        </ModalContainer>
      </Backdrop>
    </>
  )
}

export default Modal
