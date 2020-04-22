import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkPreview = ({ data }) => {
  const { domain, shortLink } = useMemo(() => {
    if (data.url.startsWith('https://' || 'http://')) {
      const urlArray = data.url.split('//');
      return {
        domain: urlArray[1].split('.')[0],
        shortLink: `//${urlArray[1]}`,
      };
    }
    return { domain: 'Link', shortLink: '' };
  }, [data]);

  return (
    <div className="flex px-8 md:px-16 py-6" target="_blank">
      <div className="flex md:flex-shrink-0 items-center border-b border-l border-t border-gray-300 rounded-l-lg">
        <Link href={shortLink}>
          <a target="_blank">
            <img
              className="rounded-lg w-36 md:w-56 p-2"
              src={data.image}
              alt="Woman paying for a purchase"
              style={{ borderRadius: '1.5rem' }}
            />
          </a>
        </Link>
      </div>
      <div className="py-2 md:py-4 pl-2 pr-2 md:pr-0 md:pl-6 border-b border-r border-t border-gray-300 rounded-r-lg">
        <div className="uppercase tracking-wide text-xs md:text-sm text-indigo-600 font-bold">
          {domain}
        </div>
        <Link href={shortLink}>
          <a target="_blank">
            <p className="block mt-1 p-1 text-xs md:text-lg leading-tight font-semibold text-gray-900 hover:underline">
              {data.title}
            </p>
          </a>
        </Link>
        <p className="md:mt-2 p-1 text-xs md:text-base text-gray-600">
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
