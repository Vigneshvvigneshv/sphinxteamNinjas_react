import { AddButton, CommonContainer, CommonHeading, LoginContainer } from "../styles/common_style"

export const UnAuthorisedPage=()=>{
          return (
            <LoginContainer>
              <CommonContainer>
                <CommonHeading>You are not authorised to access this page</CommonHeading>
                <AddButton  to={'/user-dashboard'}>Back to home</AddButton>
              </CommonContainer>
            </LoginContainer>
          )
        }
