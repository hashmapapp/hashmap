import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const InstagramProfilePreview = ({ data }) => {
  const [bio, setBio] = useState([]);
  useMemo(() => {
    if (data.biography) {
      setBio(data.biography.split('\n'));
    }
  }, [data]);
  return (
    <div className="container mx-auto sm:py-2 md:px-24">
      <div className="md:flex p-6">
        <Link href={data.profileUrl}>
          <a
            className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-4"
            target="_blank"
          >
            <img
              className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-4 shadow-lg"
              src={data.imageUrl}
              alt="Perfil"
            />
          </a>
        </Link>
        <div className="text-center md:text-left md:w-2/3 pt-2">
          <Link href={data.profileUrl}>
            <a target="_blank">
              <h2 className="font-bold text-lg w-auto inline-block pr-1">
                {data.fullName}
              </h2>
              {data.isVerified && (
                <img
                  src="../imgs/icons/verificado.svg"
                  alt="verificado"
                  className="inline-block pb-1"
                  width={15}
                />
              )}
            </a>
          </Link>
          <Link href={data.profileUrl}>
            <a target="_blank">
              <span className="font-bold text-purple-500 text-xs block">
                {`@${data.username}`}
              </span>
            </a>
          </Link>
          {bio.map((b, index) => (
            <p
              key={index.toString()}
              className="font-sans text-sm text-gray-600 text-center md:text-left md:w-auto"
            >
              {b}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

InstagramProfilePreview.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default InstagramProfilePreview;
