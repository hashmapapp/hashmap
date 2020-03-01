import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Header from 'app/components/hashmap/header/header';
import Article from 'app/components/hashmap/article/article';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';

const Section = styled.section`
  margin: 2% 25%;
`;

const SectionHashmap = ({ data }) => {
  const headerData = {
    title: data.title,
    subtitle: data.subtitle,
    info: data.info,
  };
  const articleData = {
    description: data.description,
    posts: data.posts,
  };
  return (
    <Container>
      <Section>
        <Header data={headerData} />
        <Article data={articleData} />
        <Footer data={data.author} />
      </Section>
    </Container>
  );
};

SectionHashmap.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default SectionHashmap;
