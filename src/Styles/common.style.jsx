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
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

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
    background-color:rgb(255, 255, 255);
    padding:10px 15px;
    border-radius:8px;
`;

export const CommonHeader=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
`;
export const CommonSection=styled.section`
    margin-top:15px;
`;