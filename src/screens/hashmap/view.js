import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
// import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
// import UISectionComments from 'app/components/UI/comments/comments';
// import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import PropTypes from 'prop-types';

const View = ({ hashmap, posts, hashmapKey, authorId }) => {
  return (
    <>
      <UINavBar
        typeNav="view"
        hashmapKey={hashmapKey}
        authorKey={authorId ? authorId.key : undefined}
      />
      {hashmap ? (
        <>
          <SectionHashmapView hashmap={hashmap} posts={posts} />
          {/* <UISectionMoreHashMaps /> */}
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
      {/* <UISectionComments /> */}
      {/* <UIFooter /> */}
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
