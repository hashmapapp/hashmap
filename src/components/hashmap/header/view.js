import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DARK_GRAY } from 'app/styles/colors';

const Title = styled.h1``;

const SubTitle = styled.h6`
  font-family: 'Open Sans Regular';
  color: ${DARK_GRAY};
`;

const Info = styled.span`
  font-size: 12px;
  color: ${DARK_GRAY};
  font-family: 'Open Sans Light';
`;

const header = ({ data }) => (
  <header>
    <Title>{data.title}</Title>
    <SubTitle>{data.subtitle}</SubTitle>
    <div className="container">
      <div className="row pt-2 pb-2">
        <Info>{data.info} · 7 Publicações</Info>
      </div>
    </div>
  </header>
);

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
