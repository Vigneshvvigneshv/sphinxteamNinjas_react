import styled from "styled-components";

export const Backdrop=styled.div`
  min-height: 100vh;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;

`;

export const ModalContainer=styled.div`
  width: 300px;
  height:100px;
  padding: 30px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:10px;
  font-weigth:bold;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Message=styled.p`
   color:green;
   font-weight:bold;
`;