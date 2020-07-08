import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkPreview = ({ data }) => {
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
    <div
      className="md:flex mx-8 md:mx-8 my-3 md:justify-center rounded-lg"
      target="_blank"
      style={{ border: '1px solid #e1e4e8' }}
    >
      {data.image && (
        <div className="flex md:flex-shrink-0 md:m-2 items-center justify-center ">
          <Link href={shortLink}>
            <a target="_blank">
              <img
                className="hidden md:block rounded-lg "
                src={data.image}
                alt={data.title}
                style={{ maxHeight: '10rem', maxWidth: '14rem' }}
              />
              <img
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
            <p className="block mt-1 px-1 text-xs md:text-sm leading-tight font-semibold text-gray-900 hover:underline">
              {data.title}
            </p>
          </a>
        </Link>
        <p className="md:mt-1 p-1 text-xs md:text-sm text-gray-600">
          {data.description}
        </p>
      </div>
    </div>
  );
};

LinkPreview.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LinkPreview;
