import React, { useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';

const HashmapList = ({ hashmaps, handlerNext, handlerPrevious }) => {
  useEffect(() => {
    moment.locale('pt-br');
  }, []);
  return (
    <section className="flex flex-col py-8 sm:px-8">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  aria-label="capa"
                />
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Hashmap
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Feed
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {hashmaps.map(hashmap => (
                <tr key={hashmap.key}>
                  <td className="p-2 whitespace-no-wrap border-b border-gray-200">
                    <img className="w-16" src={hashmap.imageUrl} alt="Perfil" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-base leading-5 text-gray-900">
                      <Link href="/view/[hashmap]" as={`/view/${hashmap.key}`}>
                        <a
                          target="_blank"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {hashmap.title}
                        </a>
                      </Link>
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      {hashmap.subtitle.length > 30
                        ? `${hashmap.subtitle.substring(0, 50)}...`
                        : hashmap.subtitle}
                    </div>
                  </td>
                  {hashmap.authorData && (
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {hashmap.authorData.photoURL &&
                          hashmap.authorData.photoURL.url ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={hashmap.authorData.photoURL.url}
                              alt="Perfil"
                            />
                          ) : (
                            <img
                              className="h-10 w-10 rounded-full"
                              src="imgs/avatar/avatar.jpg"
                              alt="Perfil"
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {hashmap.authorData.displayName}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            <Link
                              href="/[profile]"
                              as={`/${hashmap.authorData.username}`}
                            >
                              <a
                                target="_blank"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                {`@${hashmap.authorData.username}`}
                              </a>
                            </Link>
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {`ID: ${hashmap.author}`}
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {hashmap.homeHashmap ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Visível
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Oculto
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {moment(hashmap.createdAt).format('LL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-start md:justify-end">
              <button
                type="button"
                onClick={handlerPrevious}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handlerNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HashmapList;
