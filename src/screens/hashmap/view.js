import React, { useState, useEffect } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Section } from 'app/components/UI/styles/styles';
// import { authorization } from 'app/screens/lib/authorization';
// import { EDIT_HASHMAP_BUTTON } from 'app/screens/lib/constants';

const View = ({ hashmap, posts, hashmapKey }) => {
  // const [_editHashmapButton, _setEditHashmapButton] = useState(false);
  // useEffect(() => {
  //   _setEditHashmapButton(authorization(EDIT_HASHMAP_BUTTON));
  // }, []);
  return (
    <>
      <UINavBar />
      {hashmap && posts.length > 0 && (
        <SectionHashmapView hashmap={hashmap} posts={posts} />
      )}
      <UISectionComments />
      <UISectionMoreHashMaps />
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

export default withSubscriptionHashmapData(View);
