import React from 'react';
import styled from 'styled-components';

const CardBox = styled.div`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  padding: 2%;
  margin: 5% 0%;
`;

const NewPublication = () => (
  <CardBox className="text-center">
    <a href="/">Adicionar Publicação</a>
  </CardBox>
);

export default NewPublication;
