import React from 'react'
import { FooterContainer, FooterText, FooterDivider, FooterLinks, FooterLink } from '../styles/footer_style'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#">Privacy</FooterLink>
        <FooterLink href="#">Terms</FooterLink>
        <FooterLink href="#">Support</FooterLink>
      </FooterLinks>
      <FooterDivider />
      <FooterText>
        <strong>Sphinx</strong> — Online Assessment Platform ·  © {new Date().getFullYear()} All rights reserved
      </FooterText>
    </FooterContainer>
  )
}

export default Footer
