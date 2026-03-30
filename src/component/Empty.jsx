import React from 'react'
import { Container , EmptyContent } from '../styles/common.style'

const Empty = ({children}) => {
  return (
    <Container>
      <EmptyContent>{children}</EmptyContent>
    </Container>
  )
}

export default Empty
