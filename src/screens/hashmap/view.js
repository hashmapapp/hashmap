import React, { useEffect } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import Footer from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import PropTypes from 'prop-types';
import ProgressBar from 'react-scroll-progress-bar';
import { animateScroll as scroll } from 'react-scroll';

const View = ({ hashmap, posts, hashmapKey, authorId }) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <ProgressBar bgcolor="#000" duration="0.2" />
      <UINavBar
        typeNav="view"
        hashmapKey={hashmapKey}
        authorKey={authorId ? authorId.key : undefined}
        hashmap={hashmap}
      />
      {hashmap ? (
        <>
          <SectionHashmapView hashmap={hashmap} posts={posts} />
        </>
      ) : (
        <div className="md:px-64 text-center pt-16 md:pt-32">
          <img
            className="px-24 pt-8"
            src="../imgs/icons/page_not_found.svg"
            alt="not found page"
          />
          <p className="pt-8 md:pb-12 md:pt-12 font-sans text-lg text-gray-600 text-center">
            Página não encontrada :(
          </p>
        </div>
      )}
      <Footer />
    </>
  );
};

View.propTypes = {
  hashmap: PropTypes.shape(),
  // posts: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     description: PropTypes.string,
  //   })
  // ).isRequired,
  hashmapKey: PropTypes.string,
};

View.defaultProps = {
  hashmap: undefined,
  hashmapKey: undefined,
};

export default View;
