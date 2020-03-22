import React from 'react';
import ScreenHashmapEdit from 'app/screens/hashmap/edit';
import GlobalStyles from 'app/styles/global';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return (
    <>
      <GlobalStyles />
      <ScreenHashmapEdit params={router.query} />
    </>
  );
};
