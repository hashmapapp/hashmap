import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkPreview = ({ data }) => {
  const [errorLoadImage, setErrorLoadImage] = useState(false);
  const { domain, shortLink } = useMemo(() => {
    if (data.url.startsWith('https://' || 'http://')) {
      const urlArray = data.url.split('//');
      const s1 = urlArray[1].split('.')[0];
      const s2 = urlArray[1].split('.')[1];
      let nameDomain = s1;
      if (s1 === 'www' || s1 === 'pt') {
        nameDomain = s2;
      }
      return {
        domain: nameDomain,
        shortLink: `//${urlArray[1]}`,
      };
    }
    return { domain: '', shortLink: `//${data.url}` };
  }, [data]);

  return (
    <div className="px-8 md:px-16 py-3 md:justify-center" target="_blank">
      <div className="md:flex rounded-md ">
        {!errorLoadImage && data.image && (
          <div className="flex md:flex-shrink-0 items-center justify-center pl-1 pt-1 md:pt-0">
            <Link href={shortLink}>
              <a target="_blank">
                <img
                  onError={() => setErrorLoadImage(true)}
                  className="hidden md:block rounded-lg "
                  src={data.image}
                  alt={data.title}
                  style={{ maxHeight: '10rem', maxWidth: '14rem' }}
                />
                <img
                  onError={() => setErrorLoadImage(true)}
                  className="block md:hidden rounded-lg pb-1"
                  src={data.image}
                  alt={data.title}
                  style={{ maxHeight: '10rem' }}
                />
              </a>
            </Link>
          </div>
        )}
        <div className="md:mx-2 pt-2 rounded-lg">
          <div className="px-1 uppercase tracking-wide text-xs text-indigo-600 font-bold">
            {domain}
          </div>
          <Link href={shortLink}>
            <a target="_blank">
              <p className="block mt-1 px-1 text-sm leading-tight font-semibold text-gray-900 hover:underline">
                {data.title}
              </p>
            </a>
          </Link>
          <p className="md:mt-1 p-1 text-sm text-gray-600">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

LinkPreview.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LinkPreview;
