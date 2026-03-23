import styled from "styled-components";

export const SingupLayout=styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(237, 234, 234);
`
export const SignUpContainer=styled.div`
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`
export const SignUpHeading=styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`
export const SignupForm=styled.form`
    display:flex;
    flex-direction:column;
`;
export const FieldContainer=styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`
export const SignUpLabel=styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`

export const SignUpInput=styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
`

export const SubmitButton=styled.button`
  margin-top: 10px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #667eea;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #5a67d8;
  }
`;

export const ErrorMessage=styled.p`
    font-size:14px;
    color:red;
    margin:0;
`