import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h1``;
const InputTitle = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 2.5rem;
  resize: none;
`;

const SubTitle = styled.h6``;
const InputSubTitle = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const header = ({ data }) => (
  <header>
    {data ? (
      <>
        <Title>{data.title}</Title>
        <SubTitle>{data.subtitle}</SubTitle>
      </>
    ) : (
      <>
        <InputTitle
          rows="2"
          type="text"
          id="title"
          name="title"
          placeholder="Título"
        />
        <InputSubTitle
          rows="3"
          type="text"
          id="subtitle"
          name="subtitle"
          placeholder="Subtítulo"
        />
      </>
    )}
  </header>
);

header.propTypes = {
  data: PropTypes.shape(),
};

header.defaultProps = {
  data: undefined,
};

export default header;
