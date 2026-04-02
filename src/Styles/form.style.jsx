import styled from "styled-components";

export const FormLayout=styled.div`
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(237, 234, 234);
`
export const FormContainer=styled.div`
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`
export const FormHeading=styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: rgb(132, 96, 46);
`
export const Form=styled.form`
    display:flex;
    flex-direction:column;
    gap:10px;
`;
export const FieldContainer=styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`
export const FormLabel=styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
  &::after{
    content:"*";
    font-size:16px;
    color:red;
    display:inline;
  }
`

export const FormInput=styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: rgb(205 161 100);
    box-shadow: 0 0 5px rgba(205, 161, 100, 0.5);
  }
`
export const FormText=styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;
  width:500px;
  &:focus {
    border-color: rgb(205 161 100);
    box-shadow: 0 0 5px rgba(205, 161, 100, 0.5);
  }
`

export const SubmitButton=styled.button`
  margin-top: 10px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: rgb(205 161 100);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgb(132, 96, 46);
  }
`;

export const ErrorMessage=styled.p`
    font-size:12px;
    color:red;
    margin:0;
`
export const SuccessMessage=styled.p`
    font-size:12px;
    color:green;
    margin:0;
`