import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
// import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
// import UISectionComments from 'app/components/UI/comments/comments';
// import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';
import PropTypes from 'prop-types';
import HourglasLoader from 'app/components/UI/loader/hourglass';

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
        <div className="w-full justify-center h-64 flex items-end">
          <HourglasLoader className="flex-1" />
        </div>
      )}
      {/* <UISectionComments /> */}
      {/* <UIFooter /> */}
    </>
  );
};

View.propTypes = {
  hashmap: PropTypes.shape(),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  hashmapKey: PropTypes.string,
};

View.defaultProps = {
  hashmap: undefined,
  hashmapKey: undefined,
};

export default View;
