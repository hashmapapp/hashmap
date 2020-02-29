import React from 'react';
import styled from 'styled-components';

const Title = styled.h1``;

const SubTitle = styled.h6``;

const Info = styled.p``;

const header = () => (
  <header>
    <Title>Título</Title>
    <SubTitle>Subtítulo</SubTitle>
    <Info>May 27, 2018</Info>
  </header>
);

export default header;
