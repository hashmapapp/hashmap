import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Header from 'app/components/hashmap/header/header';
import Article from 'app/components/hashmap/article/article';
import Footer from 'app/components/hashmap/footer/footer';

const Section = styled.section`
  margin: 2% 25%;
`;

const SectionHashmap = () => (
  <Container>
    <Section>
      <Header />
      <Article />
      <Footer />
    </Section>
  </Container>
);

export default SectionHashmap;
