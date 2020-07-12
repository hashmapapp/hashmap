import React from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';
import ShareButtons from '../UI/share-buttons/share-buttons';

const SectionHashmapView = ({ hashmap, posts }) => {
  const headerData = {
    title: hashmap.title,
    subtitle: hashmap.subtitle,
    createdAt: hashmap.createdAt,
    updatedAt: hashmap.updatedAt,
  };
  const articleData = {
    description: hashmap.description,
    posts,
    urlImage: hashmap.imageUrl,
    textImage: hashmap.textImage,
  };
  const authorData = {
    displayName: hashmap.author.displayName,
    photoURL: hashmap.author.photoURL,
    username: hashmap.author.username,
    bio: hashmap.author.bio,
  };
  return (
    <>
      <HeaderView data={headerData} />
      <ArticleView data={articleData} />
      <ShareButtons title={hashmap.title} summary={hashmap.subtitle} />
      <Footer data={authorData} />
    </>
  );
};

SectionHashmapView.propTypes = {
  hashmap: PropTypes.shape().isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SectionHashmapView;
