import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import { ItemLi } from 'app/components/UI/styles/styles';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';
import Link from 'next/link';
import PropTypes from 'prop-types';

const View = ({ hashmap, posts, hashmapKey }) => {
  return (
    <>
      <UINavBar>
        <ul>
          <ItemLi>
            <Link href={`/edit?key=${hashmapKey}`}>
              <a>Editar HashMap</a>
            </Link>
          </ItemLi>
          <ItemLi>
            <Link href="/about">
              <a>Sobre</a>
            </Link>
          </ItemLi>
          <ItemLi>
            <Link href="/view">
              <a>Ler</a>
            </Link>
          </ItemLi>
        </ul>
      </UINavBar>
      {hashmap && posts.length > 0 && (
        <SectionHashmapView hashmap={hashmap} posts={posts} />
      )}
      <UISectionComments />
      <UISectionMoreHashMaps />
      <UIFooter />
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