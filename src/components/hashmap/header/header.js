import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h1``;

const SubTitle = styled.h6``;

const Info = styled.p``;

const header = ({ data }) => (
  <header>
    <Title>{data.title}</Title>
    <SubTitle>{data.subtitle}</SubTitle>
    <Info>{data.info}</Info>
  </header>
);

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
