import React from 'react'
import { CommonContainer, EmptyContent } from '../styles/common_style'

const Empty = ({ children }) => {
  return (
    <CommonContainer style={{ padding: '2.5rem 0' }}>
      <EmptyContent>{children}</EmptyContent>
    </CommonContainer>
  )
}

export default Empty
