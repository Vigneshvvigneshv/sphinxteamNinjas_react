import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { sphinxTheme } from '../theme/sphinxTheme'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // ← required for styles

const AppProvider = ({children}) => {
  return (
    <>
        <ThemeProvider theme={sphinxTheme}>
           <MantineProvider>
            {children}
           </MantineProvider>
        </ThemeProvider>
    </>
  )
}

export default AppProvider
