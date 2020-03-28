import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardBox = styled.div`
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.05);
  padding: 2%;
  margin: 5% 0%;
  width: 40%;
  border-radius: 30px;

  a {
    color: black;
    text-decoration: none;
  }

  &:hover {
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const NewPublication = ({ onAction }) => (
  <div className="row justify-content-md-center">
    <CardBox className="col-md-auto text-center">
      <a href="/" onClick={onAction}>
        Adicionar Publicação
      </a>
    </CardBox>
  </div>
);

NewPublication.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default NewPublication;
