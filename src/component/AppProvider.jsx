import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'

const AppProvider = ({children}) => {
    const theme=useSelector((state)=>state.themeReducer)
  return (
    <>
   { console.log(theme)};
    
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </>
  )
}

export default AppProvider
