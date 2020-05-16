import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const footer = ({ data }) => (
  <div className="bg-gray-200 mt-8">
    <div className="container mx-auto sm:py-8 md:px-24">
      <div className="md:flex bg-gray-200 rounded-lg p-6">
        <Link href="/[profile]" as={`/${data.username}`}>
          <a className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-4">
            {data.photoURL &&
              (data.photoURL.url ? (
                <img
                  className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-4"
                  src={data.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-4"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              ))}
          </a>
        </Link>
        <div className="text-center md:text-left md:w-2/3 pt-2">
          <Link href="/[profile]" as={`/${data.username}`}>
            <a>
              <h2 className="font-bold text-lg w-auto inline-block">
                {data.displayName}
              </h2>
            </a>
          </Link>
          <Link href="/[profile]" as={`/${data.username}`}>
            <a>
              <span className="font-bold text-purple-500 text-xs block">
                @{data.username}
              </span>
            </a>
          </Link>
          <p className="pt-2 italic font-sans text-sm text-gray-600 text-center md:text-left md:w-auto">
            {data.bio}
          </p>
        </div>
      </div>
    </div>
  </div>
);

footer.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default footer;
