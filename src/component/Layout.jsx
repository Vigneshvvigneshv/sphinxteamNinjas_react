import React from 'react'
import styled from 'styled-components'
import Header from './Header';
import Footer from './Footer';
import {  MainContainer } from '../styles/layout.style';




const Layout = ({children}) => {
  return (
    <>
      <Header></Header>
      <MainContainer>{children}</MainContainer>
      <Footer></Footer>
    </>
  )
}

export default Layout
