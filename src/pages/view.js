import React from 'react';
import ScreenHashmapView from 'app/screens/hashmap/view';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return <ScreenHashmapView params={router.query} />;
};
