import React from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import PropTypes from 'prop-types';

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
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-8">
            <HeaderView data={headerData} />
            <hr />
            <ArticleView data={articleData} />
            <Footer data={data.author} />
          </div>
        </div>
      </div>
    </>
  );
};

SectionHashmapView.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default SectionHashmapView;
