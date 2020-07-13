import React from 'react';
import dynamic from 'next/dynamic';

const DynamicLoadedPublication = dynamic(import('./publication'), {
  loading: () => <p>Carregando recomendação...</p>,
  ssr: false,
});

export default DynamicLoadedPublication;
