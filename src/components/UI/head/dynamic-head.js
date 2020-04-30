import React from 'react';
import Head from 'next/head';

const DynamicHead = () => (
  <Head>
    <title>Hashmap</title>
    <meta
      name="description"
      content="Um lugar onde o conhecimento se contrói com referências."
    />
    <meta name="keywords" content="hashmap, link, conhecimento, aprendizagem" />
    <meta name="author" content="Hashmap Corporation" />

    {/* <!-- Open Graph / Facebook  */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://hashmap.now.sh/" />
    <meta property="og:title" content="Hashmap" />
    <meta
      property="og:description"
      content="Um lugar onde o conhecimento se contrói com referências."
    />
    <meta
      property="og:image"
      content="https://hashmap-nx3c6ypit.now.sh/imgs/logo/H.png"
    />

    {/* <!-- Twitter  */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://hashmap.now.sh/" />
    <meta property="twitter:title" content="Hashmap" />
    <meta
      property="twitter:description"
      content="Um lugar onde o conhecimento se contrói com referências."
    />
    <meta
      property="twitter:image"
      content="https://hashmap-nx3c6ypit.now.sh/imgs/logo/H.png"
    />
  </Head>
);

export default DynamicHead;
