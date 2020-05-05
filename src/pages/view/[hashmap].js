import React from 'react';
import ScreenHashmapView from 'app/screens/hashmap/view';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import { getAllHashmapsKeys } from 'app/lib/hashmaps';
import { HASHMAPS_COLLECTION } from 'app/screens/lib/constants';
import { loadFirebaseStore } from 'app/lib/db';

export default ({ hashmap, posts, hashmapKey }) => {
  return (
    <>
      <DynamicHead
        titleText={hashmap ? hashmap.title : undefined}
        description={hashmap ? hashmap.subtitle : undefined}
        imageUrl={hashmap ? hashmap.imageUrl : undefined}
      />
      <ScreenHashmapView
        hashmap={hashmap}
        posts={posts}
        hashmapKey={hashmapKey}
      />
    </>
  );
};

export async function getStaticProps({ params }) {
  let hashmap;
  const FirebaseStore = loadFirebaseStore();
  const hashmapKey = params.hashmap;
  try {
    const data = await FirebaseStore()
      .collection(HASHMAPS_COLLECTION)
      .doc(hashmapKey)
      .get();
    hashmap = { ...data.data(), key: hashmapKey };
    hashmap.createdAt = hashmap.createdAt.toDate().toISOString();
    hashmap.updatedAt = hashmap.updatedAt.toDate().toISOString();
  } catch (err) {
    console.error(err);
  }
  return { props: { hashmap, posts: [], hashmapKey } };
}

export async function getStaticPaths() {
  const hashmapKeys = await getAllHashmapsKeys();
  return {
    paths: hashmapKeys,
    fallback: true,
  };
}
