import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';
import { Section } from 'app/components/UI/styles/styles';

const SectionHashmapView = ({ data }) => {
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
        <HeaderView data={headerData} />
        <ArticleView data={articleData} />
        <Footer data={data.author} />
      </Section>
    </Container>
  );
};

SectionHashmapView.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default SectionHashmapView;
