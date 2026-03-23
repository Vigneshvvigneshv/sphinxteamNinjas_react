import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const LoginForm=styled.form`
   display:flex;
   flex-direction:column;
   gap:10px;
   padding:40px;
   border-radius:8px;
   background-color:rgb(255, 251, 251);
   box-shadow:2px 2px 10px 5px rgba(0, 0, 0, 0.3);
`;
export const FieldContainer=styled.div`
    display:flex;
    flex-direction:column;
    gap:2px;
`
export const LoginLabel=styled.label`

`

export const LoginInput=styled.input`
    padding:4px 20px;

`;
export const LoginHeading=styled.h2`

`
export const LoginButton=styled.button`

`
export const NewAccountContainer=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:4px;
`
export const CreateAnAccount=styled.p`

`
export const NLink =styled(NavLink)`
    
`

