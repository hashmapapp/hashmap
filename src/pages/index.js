import React, { useEffect, useState } from 'react';
import ScreenHome from 'app/screens/home/home';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import Banner from 'app/components/home/banner/banner';
import { loadFirebaseStore } from 'app/lib/db';
import { HOME_HASHMAP_COLLECTION } from 'app/screens/lib/constants';

export default () => {
  const [hashmaps, setHashmaps] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);
  const LIMIT_ITEMS = 25;

  const getQueryFb = () => {
    const fb = loadFirebaseStore();
    return fb()
      .collection(HOME_HASHMAP_COLLECTION)
      .orderBy('createdAt', 'desc');
  };

  const refreshData = (data, currentData = []) => {
    const map = [];
    if (data.docs.length) {
      // console.log('Update Data');
      data.forEach(doc => {
        const aux = { ...doc.data(), key: doc.id };
        map.push(aux);
      });
      setLastVisible(data.docs[data.docs.length - 1]);
      setHashmaps([...currentData, ...map]);
    } else {
      console.log('Finish Data');
      setHasMoreData(false);
    }
  };

  useEffect(() => {
    window.onbeforeunload = null;
    getQueryFb()
      .limit(LIMIT_ITEMS)
      .get()
      .then(refreshData);
  }, []);

  const fetchMoreData = () => {
    if (lastVisible) {
      // console.log('fetchMoreData');
      getQueryFb()
        .startAfter(lastVisible)
        .limit(LIMIT_ITEMS)
        .get()
        .then(data => refreshData(data, hashmaps));
    }
  };

  return (
    <>
      <DynamicHead />
      <ScreenHome
        hashmaps={hashmaps}
        fetchMoreData={fetchMoreData}
        hasMoreData={hasMoreData}
      />
      {!hasMoreData && <Banner />}
    </>
  );
};
