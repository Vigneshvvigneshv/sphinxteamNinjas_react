import React from 'react'
import styled from 'styled-components'
import Header from './Header';

const MainConatainer=styled.div`
margin:20px;`;

const Layout = ({children}) => {
  return (
    <>
    <Header></Header>
    <MainConatainer>{children}</MainConatainer>
    <Footer></Footer>
    </>
  )
}

export default Layout
