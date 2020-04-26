import React from 'react';
import ScreenHashmapEdit from 'app/screens/hashmap/edit';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return <ScreenHashmapEdit params={router.query} />;
};
