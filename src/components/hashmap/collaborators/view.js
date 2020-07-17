import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const collaborators = ({ data }) => {
  return (
    <div className="container px-8 py-8 lg:px-2">
      <h2 className="font-bold text-lg w-auto inline-block">
        Curador
      </h2>
      <Link href="/[profile]" as={`/${data.username}`}>
        <div className="flex overflow-x-auto border-b border-gray-400 w-full pb-2 lg:flex-wrap">
          <div
            className="flex items-center my-2 mr-2 py-2 px-2 border border-gray-400 rounded-lg"
            style={{ minWidth: 'fit-content' }}
          >
            {data.photoURL && data.photoURL.url ?
              (
                <img
                  className="h-8 w-8 rounded-full"
                  src={data.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              )
            }
            <div>
              <div className="px-2 text-xl text-gray-900 leading-tight">
                {data.displayName}
              </div>
              <div className="px-2 text-base text-gray-600 leading-normal">
                @{data.username}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <h2 className="font-bold mt-4 text-lg w-auto inline-block">
        Coautores
      </h2>
      <div className="flex overflow-x-auto w-full lg:flex-wrap">
        <Link href="/[profile]" as={`/${data.username}`}>
          <div
            className="flex items-center my-2 mr-2 py-2 px-2 border border-gray-400 rounded-lg"
            style={{ minWidth: 'fit-content' }}
          >
            {data.photoURL && data.photoURL.url ?
              (
                <img
                  className="h-8 w-8 rounded-full"
                  src={data.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              )
            }
            <div>
              <div className="px-2 text-xl text-gray-900 leading-tight">
                {data.displayName}
              </div>
              <div className="px-2 text-base text-gray-600 leading-normal">
                @{data.username}
              </div>
            </div>
          </div>
        </Link>

        <Link href="/[profile]" as={`/${data.username}`}>
          <div
            className="flex items-center my-2 mr-2 py-2 px-2 border border-gray-400 rounded-lg"
            style={{ minWidth: 'fit-content' }}
          >
            {data.photoURL && data.photoURL.url ?
              (
                <img
                  className="h-8 w-8 rounded-full"
                  src={data.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              )
            }
            <div>
              <div className="px-2 text-xl text-gray-900 leading-tight">
                {data.displayName}
              </div>
              <div className="px-2 text-base text-gray-600 leading-normal">
                @{data.username}
              </div>
            </div>
          </div>
        </Link>

        <Link href="/[profile]" as={`/${data.username}`}>
          <div
            className="flex items-center my-2 mr-2 py-2 px-2 border border-gray-400 rounded-lg"
            style={{ minWidth: 'fit-content' }}
          >
            {data.photoURL && data.photoURL.url ?
              (
                <img
                  className="h-8 w-8 rounded-full"
                  src={data.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              )
            }
            <div>
              <div className="px-2 text-xl text-gray-900 leading-tight">
                {data.displayName}
              </div>
              <div className="px-2 text-base text-gray-600 leading-normal">
                @{data.username}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div >
  );
}

collaborators.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default collaborators;
