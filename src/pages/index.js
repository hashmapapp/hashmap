import React from 'react';
import ScreenHome from 'app/screens/home/home';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import Banner from 'app/components/home/banner/banner';
import { loadFirebaseStore } from 'app/lib/db';
import { HOME_HASHMAP_COLLECTION } from 'app/screens/lib/constants';

export default ({ hashmaps }) => {
  return (
    <>
      <DynamicHead />
      <ScreenHome hashmaps={hashmaps} />
      <Banner />
    </>
  );
};

export async function getServerSideProps() {
  const hashmaps = [];
  const fb = loadFirebaseStore();
  try {
    const data = await fb()
      .collection(HOME_HASHMAP_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();
    data.forEach(doc => {
      const aux = { ...doc.data(), key: doc.id };
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
