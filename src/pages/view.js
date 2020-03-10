import React from 'react';
import ScreenHashmapView from 'app/screens/hashmap/view';
import GlobalStyles from 'app/styles/global';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return (
    <>
      <GlobalStyles />
      <ScreenHashmapView param={router.query} />
    </>
  );
};
