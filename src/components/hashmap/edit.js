import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import HeaderEdit from 'app/components/hashmap/header/edit';
import ArticleEdit from 'app/components/hashmap/article/edit';
import PropTypes from 'prop-types';

const Section = styled.section`
  margin: 2% 25%;
`;

const SectionHashmapEdit = ({ data }) => {
  const headerData = data
    ? {
        title: data.title,
        subtitle: data.subtitle,
        info: data.info,
      }
    : undefined;
  const articleData = data
    ? {
        description: data.description,
        posts: data.posts,
      }
    : undefined;
  return (
    <Container>
      <Section>
        <HeaderEdit data={headerData} />
        <ArticleEdit data={articleData} />
      </Section>
    </Container>
  );
};

SectionHashmapEdit.propTypes = {
  data: PropTypes.shape(),
};

SectionHashmapEdit.defaultProps = {
  data: undefined,
};

export default SectionHashmapEdit;
