import React from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
// import Footer from 'app/components/hashmap/footer/footer';
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
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-8">
            <HeaderView data={headerData} />
            <hr />
            <ArticleView data={articleData} />
            {/* <Footer data={data.author} /> */}
          </div>
        </div>
      </div>
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
