import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const Footer = styled.footer`
  flex-shrink: 0;
  text-align: center;
  background-color: #191919;
  color: white;
  padding-top: 2%;
  padding-bottom: 1%;
`;

const footer = () => (
  <Footer>
    <Container>
      <p>FOOTER</p>
    </Container>
  </Footer>
);

export default footer;
