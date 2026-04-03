import styled from "styled-components";

export const AppName=styled.h1`
     color: rgb(132, 96, 46);
`;

export const Title=styled.h2`
    color:white;
`;
export const CommonHeading=styled.h3`
     
`

export const Loader=styled.p`
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const Required=styled.p`
    font-size:16px;
    color:red;
    display:inline;
`;
export const Outer=styled.div`
    text-align:center;
`;
export const LoginContainer=styled.div`
    height:100vh;
    display:flex;
    align-items:center;
    flex-direction:column;
    gap:20px;
    justify-content:space-evenly;
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
  font-size:14px;
  &:hover {
    background: rgb(132, 96, 46);
  }
`;

export const Container=styled.div`
    display:flex;
    gap:20px;
    justify-content:space-between;
`;

export const RowContainer=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
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
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
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
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
    margin-top:15px;
    background-color:rgb(255, 255, 255);
    padding:10px 15px;
    border-radius:8px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

export const TableHeading=styled.h3`

`;

export const Content=styled.p`
    width:180px;
    font-weight:bold;
    font-size:14px;
`;

export const ButtonContainer=styled.div`
    display:flex;
    gap:10px;
    justify-content:space-between;
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
    height:100vh;
`;

export const Dropdown=styled.select`
    padding:9px 12px;
    border-radius:8px;
   
    text-align:center;

`;