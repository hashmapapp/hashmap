import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const DynamicHead = ({ titleText, description, imageUrl }) => {
  const [url, setUrl] = useState();
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="hashmap, link, conhecimento, aprendizagem"
      />
      <meta name="author" content="Hashmap Corporation" />

      {/* <!-- Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* <!-- Twitter  */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={titleText} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
};

DynamicHead.propTypes = {
  titleText: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

DynamicHead.defaultProps = {
  titleText: 'Hashmap',
  description: 'Ensine menos, recomende mais.',
  imageUrl: 'https://hashmap-nx3c6ypit.now.sh/imgs/logo/H.png',
};

export default DynamicHead;
