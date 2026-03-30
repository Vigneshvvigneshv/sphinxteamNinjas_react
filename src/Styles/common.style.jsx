import styled from "styled-components";

export const Title=styled.h1`
    color:white;
`;
export const CommonHeading=styled.h2`
     
`

export const LoginContainer=styled.div`
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;

export const Button=styled.button`
  margin-top: 10px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: rgb(205 161 100);
  color: white;
  cursor: pointer;
  transition: 0.3s;
  font-weight:bold;
  font-size:14px;
  &:hover {
    background: rgb(132, 96, 46);
  }
`;

export const Container=styled.div`
    display:flex;
    gap:20px;
`;

export const CommonContainer=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:8px;
    flex-direction:column;
    gap:10px;
`;

export const CommonHeader=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    background-color:rgb(255, 255, 255);
    padding:10px 15px;
    border-radius:8px;
`;
export const CommonSection=styled.section`
    margin-top:15px;
    border-radius:8px;
    width:100%;
`;

export const CommonTable=styled.div`

`;

export const TableRow=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:15px;
    background-color:rgb(255, 255, 255);
    padding:10px 15px;
    border-radius:8px;
`;

export const Content=styled.p`
    font-weight:bold;
    font-size:16px;
`;

export const ButtonContainer=styled.div`
    display:flex;
    gap:10px;
    button{
        padding:7px 9px;
    }
`;

export const EmptyContent=styled.p`
    font-weight:bold;
    font-size:16px;
    text-align:center;
    flex:1;
`;

export const Backdrop=styled.div`
    background-color:rgb(95, 89, 89);
    z-index:100;
`;
