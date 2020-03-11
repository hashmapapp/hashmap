import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import HeaderEdit from 'app/components/hashmap/header/edit';
import ArticleEdit from 'app/components/hashmap/article/edit';

const Section = styled.section`
  margin: 2% 25%;
`;

const SectionHashmapEdit = () => {
  return (
    <Container>
      <Section>
        <HeaderEdit />
        <ArticleEdit />
      </Section>
    </Container>
  );
};

export default SectionHashmapEdit;
