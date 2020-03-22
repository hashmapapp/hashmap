import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import { ItemLi } from 'app/components/UI/styles/styles';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';
import Link from 'next/link';

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

export default withSubscriptionHashmapData(View);
