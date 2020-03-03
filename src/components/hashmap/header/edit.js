import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 2.5rem;
  resize: none;
`;

const SubTitleTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const header = ({ data }) => {
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  return (
    <header>
      <TitleTextArea
        rows="2"
        id="title"
        name="title"
        placeholder="Título"
        onChange={e => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <SubTitleTextArea
        rows="3"
        type="text"
        id="subtitle"
        name="subtitle"
        placeholder="Subtítulo"
        onChange={e => {
          setSubTitle(e.target.value);
        }}
        value={subTitle}
      />
    </header>
  );
};

header.propTypes = {
  data: PropTypes.shape(),
};

header.defaultProps = {
  data: undefined,
};

export default header;
