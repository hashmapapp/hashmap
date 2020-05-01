import React from 'react';
import ScreenHashmapView from 'app/screens/hashmap/view';
import { useRouter } from 'next/router';
import DynamicHead from 'app/components/UI/head/dynamic-head';

export default () => {
  const router = useRouter();
  return (
    <>
      <DynamicHead />
      <ScreenHashmapView params={router.query} />
    </>
  );
};
