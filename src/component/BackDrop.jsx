import styled from "styled-components";

const BackContainer=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:10003;
`;  
const BackContent=styled.div`
    background-color: ${({theme})=>theme.colors.cream};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;


export default function BackDrop({children}){
    return(
        <>
            <BackContainer>
                <BackContent>
                    {children}
                </BackContent>
            </BackContainer>
        </>
    )
}