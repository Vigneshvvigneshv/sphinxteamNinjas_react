import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { MainContainer } from '../styles/layout_style';
import { Toaster } from 'sonner';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster richColors/> 
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  )
}

export default Layout
