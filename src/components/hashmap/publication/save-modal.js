import React, { useEffect, useState } from 'react';
import UIModal from 'app/components/UI/modal/modal';
import { connect } from 'react-redux';
import Loader from 'app/components/UI/loader/loader';
import { UserService } from 'app/services/user.service';
import { HashmapService } from 'app/services/hashmap.service';
import Router from 'next/router';
import { loadFirebaseAuth } from 'app/lib/db';

const SaveModal = ({ closeModal, hashmapRedux }) => {
  const [validators, setValidators] = useState({
    title: false,
    image: false,
    posts: false,
  });
  const [typeModal, setTypeModal] = useState();
  const [hashmap, setHashmap] = useState();
  const [loading, setLoading] = useState(false);

  const submitValidators = hm => {
    const validInput = {
      title: false,
      image: false,
      posts: true,
    };
    if (hm.title) {
      validInput.title = true;
    }
    if (hm.imagePath && hm.imageUrl) {
      validInput.image = true;
    }
    if (hm.posts && hm.posts.length) {
      const list = hm.posts.filter(post => !post.key.startsWith('DELETE'));
      if (list.length) {
        list.forEach(post => {
          if (
            !(
              (post.instragramPostPreview &&
                post.instragramPostPreview.value) ||
              (post.instragramProfilePreview &&
                post.instragramProfilePreview.value) ||
              (post.linksToPreview && post.linksToPreview.length) ||
              post.textDescription ||
              post.title ||
              (post.videoYT && post.videoYT.value)
            )
          ) {
            validInput.posts = false;
          }
        });
      } else {
        validInput.posts = false;
      }
    } else {
      validInput.posts = false;
    }
    setValidators(validInput);
    return validInput.title && validInput.image && validInput.posts;
  };

  const submitHashmap = () => {
    setLoading(true);
    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const userService = new UserService();
        userService
          .getUserById(uid)
          .then(resolve => {
            if (resolve) {
              HashmapService.saveHashmap(
                hashmapRedux,
                () => {
                  const userData = resolve.data();
                  Router.push('/[profile]', `/${userData.username}`);
                },
                uid
              );
            }
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }
    });
  };

  useEffect(() => {
    if (hashmapRedux) {
      const valid = submitValidators(hashmapRedux);
      if (!valid) {
        setTypeModal('INVALID');
      } else {
        setHashmap(hashmapRedux);
        setTypeModal('PREVIEW');
      }
    }
  }, []);

  return (
    <>
      {typeModal === 'INVALID' && (
        <UIModal closeModal={closeModal}>
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Ops! Acho que esqueceu de algo:
                  </h3>
                  <div className="mt-2">
                    <ul>
                      <li>
                        <span
                          role="img"
                          aria-label="Título"
                          className="leading-5 text-gray-800"
                        >
                          Título {validators.title ? '😍' : '😱'}
                        </span>
                      </li>
                      <li>
                        <span
                          role="img"
                          aria-label="Título"
                          className="leading-5 text-gray-800"
                        >
                          Capa (Imagem) {validators.image ? '😍' : '😱'}
                        </span>
                      </li>
                      <li>
                        <span
                          role="img"
                          aria-label="Título"
                          className="leading-5 text-gray-800"
                        >
                          Recomendação {validators.posts ? '😍' : 'Vazia 😱'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Continuar Editando
                </button>
              </span>
            </div>
          </div>
        </UIModal>
      )}
      {typeModal === 'PREVIEW' && (
        <UIModal closeModal={closeModal}>
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white p-2 pb-4">
              <div className="">
                <div className="my-3 text-center">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Tudo certo por aqui!
                  </h3>
                </div>
                {hashmap && (
                  <div className="md:max-w-sm w-full md:max-w-full md:flex h-full p-2">
                    <div
                      className="h-48 md:h-auto md:w-64 flex-none bg-cover rounded-t-lg md:rounded-l-lg 
                          text-center overflow-hidden md:w-56 bg-gray-200"
                      style={{
                        backgroundImage: `url('${hashmap.imageUrl}')`,
                      }}
                      title={hashmap.title}
                    />

                    <div
                      className="md:rounded-r-lg p-4 flex flex-col justify-between rounded-b-lg
                          leading-normal shadow-xl w-full bg-white"
                    >
                      <div className="">
                        <div className="leading-snug font-medium text-gray-900 text-xl mb-2">
                          {hashmap.title}
                        </div>

                        <p className="leading-snug font-light text-gray-700 text-base">
                          {hashmap.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {loading ? (
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <div
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-black 
                  text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 
                  focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    <Loader color="black" />
                  </div>
                </span>
              ) : (
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={submitHashmap}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-black 
                  text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 
                  focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Publicar
                  </button>
                </span>
              )}
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  disabled={loading}
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white 
                  text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none 
                  focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Continuar Editando
                </button>
              </span>
            </div>
          </div>
        </UIModal>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  hashmapRedux: state.hashmap,
});

export default connect(mapStateToProps, null)(SaveModal);
