import React from 'react';
import ScreenHome from 'app/screens/home/home';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import { loadFirebaseStore } from 'app/lib/db';
import { HOME_HASHMAP_COLLECTION } from 'app/screens/lib/constants';

export default ({ hashmaps }) => (
  <>
    <DynamicHead />
    <ScreenHome hashmaps={hashmaps} />
  </>
);

export async function getStaticProps() {
  const hashmaps = [];
  const fb = loadFirebaseStore();
  try {
    const data = await fb()
      .collection(HOME_HASHMAP_COLLECTION)
      .get();
    data.forEach(doc => {
      const aux = { ...doc.data(), key: doc.id };
      aux.createdAt = aux.createdAt.toDate().toISOString();
      hashmaps.push(aux);
    });
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      hashmaps,
    },
  };
}
