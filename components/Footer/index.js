import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer(() => ({
  backgroundColor: '#333',
  color: '#fff',
  marginTop: 'auto',
  width: '100%',
}));

const FooterContent = styled.div(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (min-width: 600px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const FooterLinks = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (min-width: 600px)': {
    flexDirection: 'row',
  },
}));

const FooterLink = styled.a(() => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  margin: '5px 0',
  '@media (min-width: 600px)': {
    margin: '0 10px',
  },
  '&:hover': {
    color: '#ccc',
  },
}));

const CompanyName = styled.div(() => ({
  marginTop: '20px',
  '@media (min-width: 600px)': {
    marginTop: '0',
  },
}));

const Divider = styled.span(() => ({
  color: '#777',
  margin: '0 10px',
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'inline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href={'/'}>Home</FooterLink>
          <Divider>|</Divider>
          <FooterLink href={'#'}>About</FooterLink>
          <Divider>|</Divider>
          <FooterLink href={'#'}>Services</FooterLink>
        </FooterLinks>
        <CompanyName>© 2024 Vidyalai Interview Challenge</CompanyName>
        <FooterLinks>
          <FooterLink href={'#'}>Contact</FooterLink>
          <Divider>|</Divider>
          <FooterLink href={'#'}>Privacy Policy</FooterLink>
          <Divider>|</Divider>
          <FooterLink href={'#'}>Terms of Service</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;