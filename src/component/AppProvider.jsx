import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { sphinxTheme } from '../theme/sphinxTheme'

const AppProvider = ({children}) => {
  return (
    <>
        <ThemeProvider theme={sphinxTheme}>
            {children}
        </ThemeProvider>
    </>
  )
}

export default AppProvider
