import React from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';

const SectionHashmapView = ({ hashmap, posts }) => {
  const headerData = {
    title: hashmap.title,
    subtitle: hashmap.subtitle,
    // info: hashmap.info,
  };
  const articleData = {
    description: hashmap.description,
    posts,
    urlImage: hashmap.imageUrl,
    textImage: hashmap.textImage,
  };
  return (
    <>
      <HeaderView data={headerData} />
      <ArticleView data={articleData} />
      <Footer data={hashmap} />
    </>
  );
};

SectionHashmapView.propTypes = {
  hashmap: PropTypes.shape().isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default SectionHashmapView;
