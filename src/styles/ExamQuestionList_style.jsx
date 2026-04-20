import styled from "styled-components";


export const Container=styled.div`
  max-width: 700px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 12px;
  background: #f9fafc;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
`
export const TopBar=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`
export const Timer=styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #e63946;
`

export const SubmitButtonTop=styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #28a745;
  color: #fff;
  cursor: pointer;

  &:hover{
     background: #218838;
  }

`

export const Question=styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  color: #222;
`

export const OptionBox=styled.label`
  display: block;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #fff;
  transition: 0.2s;

  &:hover{
     background: #f1f5ff;
  }

 ${({ selected }) =>
    selected &&
    `
    background: #e6f0ff;
    border-color: #4a90e2;
  `}
`

export const ButtonContainer=styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export const Button=styled.button`
     padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${({ primary }) => (primary ? "#4a90e2" : "#ddd")};
  color: ${({ primary }) => (primary ? "#fff" : "#333")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    opacity: 0.9;
  }
`