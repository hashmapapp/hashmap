import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const footer = ({ data }) => (
  <div className="container mx-auto sm:py-8 md:px-64">
    <hr />
    <div className="md:flex bg-white rounded-lg p-6 mt-8">
      <Link href={`/${data.username}`}>
        <a>
          <img
            className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            src={data.photoUrl}
            alt="Perfil"
          />
        </a>
      </Link>
      <div className="text-center md:text-left pt-2">
        <Link href={`/${data.username}`}>
          <a>
            <h2 className="text-lg">{data.displayName}</h2>
          </a>
        </Link>
        <div className="text-purple-500">{data.username}</div>
      </div>
    </div>
  </div>
);

footer.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default footer;
