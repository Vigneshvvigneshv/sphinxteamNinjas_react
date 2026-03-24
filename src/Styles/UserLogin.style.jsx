import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:20px;
    align-items:center;
    height:100vh;
`;

export const LoginForm=styled.form`
   display:flex;
   flex-direction:column;
   gap:15px;
   padding:20px 35px;
   border-radius:8px;
   background-color:rgb(255, 251, 251);
   box-shadow:2px 2px 10px 5px rgba(0, 0, 0, 0.3);
`;
export const FormContainer=styled.div`
    width:300px;
    padding:20px 10px;
    display:flex;
    flex-direction:column;
    gap:15px;
`;
export const FieldContainer=styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    gap:5px;
`
export const LoginLabel=styled.label`
    font-size:14px;
`

export const LoginInput=styled.input`
    padding:9px 12px;
    border-radius:8px;
    border:1px solid gray;
   
`;
export const LoginHeading=styled.h2`
    text-align:center; 
`
export const LoginButton=styled.button`
    padding:9px 12px;
    font-size:14px;
    font-weight:bold;
`

export const CreateAnAccount=styled.p`

`
export const NLink =styled(NavLink)`
    
`

