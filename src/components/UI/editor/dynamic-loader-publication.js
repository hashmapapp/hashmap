import React from 'react';
import dynamic from 'next/dynamic';

const DynamicLoadedPublication = dynamic(import('./publication'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default DynamicLoadedPublication;
