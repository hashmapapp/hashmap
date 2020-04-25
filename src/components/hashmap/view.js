import React from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';

const SectionHashmapView = ({ hashmap, posts }) => {
  const headerData = {
    title: hashmap.title,
    subtitle: hashmap.subtitle,
    createdAt: hashmap.createdAt.toDate(),
    updatedAt: hashmap.updatedAt.toDate(),
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
    <div className="bg-gray-100">
      <HeaderView data={headerData} />
      <ArticleView data={articleData} />
      <Footer data={authorData} />
    </div>
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
