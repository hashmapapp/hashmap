import React, { useEffect, useState, useMemo } from 'react';
import { loadFirebaseAuth, loadFirebaseStore } from 'app/lib/db';
import Link from 'next/link';
import { USERS_COLLECTION } from 'app/screens/lib/constants';
import {
  FaEdit,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaGithubAlt,
  FaMediumM,
} from 'react-icons/fa';
import { IoMdLink } from 'react-icons/io';
import Loader from 'app/components/UI/loader/loader';
import ProfileImageUpload from 'app/components/UI/image/profile-upload';
import AuthenticationServiceFirebase from 'app/services/authentication.service';

const Settings = () => {
  const [userFirestore, setUserFirestore] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [role, setRole] = useState();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useMemo(() => {
    if (edit && userFirestore.photoURL && userFirestore.photoURL.path) {
      setDefaultFiles([
        {
          source: userFirestore.photoURL.path,
          options: {
            type: 'local',
          },
        },
      ]);
    }
  }, [edit]);

  const handlerChangeForm = (attribute, value) => {
    const dataCurrent = { ...userFirestore };
    dataCurrent[attribute] = value;
    setUserFirestore(dataCurrent);
  };

  const updateSuccess = () => {
    setLoading(false);
    setEdit(false);
    console.log('Profile Update');
  };

  const updateError = error => {
    setLoading(false);
    console.error(error.code, error.message);
  };

  const onSubmit = () => {
    const auth = new AuthenticationServiceFirebase();
    setLoading(true);
    auth.updateProfile(
      userFirestore.displayName,
      userFirestore.photoURL,
      userFirestore.bio,
      userFirestore.facebook,
      userFirestore.instagram,
      userFirestore.twitter,
      userFirestore.linkedin,
      updateSuccess,
      updateError
    );
  };

  const onValidators = evt => {
    evt.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    let mounted = true;
    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        if (mounted) {
          setCurrentUser(user);
        }
        const fb = loadFirebaseStore();
        const userRef = fb()
          .collection(USERS_COLLECTION)
          .doc(user.uid);
        userRef
          .get()
          .then(userDoc => {
            if (userDoc.exists && mounted) {
              setUserFirestore(userDoc.data());
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      }
    });

    // eslint-disable-next-line
    return () => (mounted = false);
  }, []);

  const replaceLink = link => {
    return link ? `//${link.split('//')[1]}` : undefined;
  };

  useMemo(() => {
    if (userFirestore) {
      switch (userFirestore.role) {
        case 'productor':
          setRole('criador');
          break;
        case 'admin':
          setRole('administrador');
          break;
        default:
          setRole('principiante');
          break;
      }

      const links = {};
      links.instagram = replaceLink(userFirestore.instagram);
      links.twitter = replaceLink(userFirestore.twitter);
      links.linkedin = replaceLink(userFirestore.linkedin);
      links.facebook = replaceLink(userFirestore.facebook);
      setSocialLinks(links);
    }
  }, [userFirestore]);

  return (
    <>
      {currentUser && userFirestore && (
        <div className="container mx-auto md:px-64">
          {userFirestore.role === 'default' && (
            <div
              className="mb-16 mx-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">
                    Seja muito bem vind@, {userFirestore.displayName}!
                  </p>
                  <p className="text-sm">
                    Ainda estamos em uma versão beta. Mas se você desejar, pode
                    fazer parte do nosso <strong>Grupo Secreto</strong> e se
                    tornar um <strong>CRIADOR</strong> de Hashmaps.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-lg">
            {!edit &&
              (userFirestore.photoURL && userFirestore.photoURL.url ? (
                <img
                  className="my-8 h-32 w-32 rounded-full mx-auto"
                  src={userFirestore.photoURL.url}
                  alt="Perfil"
                />
              ) : (
                <img
                  className="my-8 h-32 w-32 rounded-full mx-auto"
                  src="imgs/avatar/avatar.jpg"
                  alt="Perfil"
                />
              ))}
            {edit && (
              <div className="my-8 h-56 w-56 mx-auto">
                <ProfileImageUpload
                  storageName="users"
                  onRequestSave={(path, url) => {
                    handlerChangeForm('photoURL', { path, url });
                  }}
                  onRequestClear={() => {
                    handlerChangeForm('photoURL', {});
                  }}
                  defaultFiles={defaultFiles}
                />
              </div>
            )}
            <div className="flex justify-center pt-2">
              <div className="text-center">
                <Link href="/[profile]" as={`/${userFirestore.username}`}>
                  <a>
                    <div
                      className="p-2 bg-indigo-100 items-center leading-none rounded-full flex mb-4"
                      role="alert"
                    >
                      <span className="uppercase font-semibold text-center flex-auto">
                        {role}
                      </span>
                      <IoMdLink className="ml-2" />
                    </div>
                  </a>
                </Link>

                <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="m-2 border hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <FaEdit className="fill-current w-4 h-4 mr-2" />
                  <span>{!edit ? 'Editar' : 'Cancelar'}</span>
                </button>
              </div>
            </div>
            {!edit && (
              <div className="text-center">
                <h2 className="my-4 text-gray-900 font-bold text-xl mb-2">
                  {userFirestore.displayName}
                </h2>
                <h2 className="text-sm text-gray-600">
                  {`@${userFirestore.username}`}
                </h2>
                <h2 className="mb-4 text-sm text-gray-600">
                  {userFirestore.email}
                </h2>
                {userFirestore.bio && (
                  <p className="italic font-sans text-base text-gray-700 p-4 ">
                    &quot;{userFirestore.bio}&quot;
                  </p>
                )}
                <div>
                  {userFirestore.instagram && (
                    <Link href={`${socialLinks.instagram}`}>
                      <a target="_blank">
                        <button
                          type="button"
                          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          <FaInstagram className="fill-current w-4 h-4 mr-2" />
                          <span>Instagram</span>
                        </button>
                      </a>
                    </Link>
                  )}
                  {userFirestore.linkedin && (
                    <Link href={`${socialLinks.linkedin}`}>
                      <a target="_blank">
                        <button
                          type="button"
                          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          <FaLinkedin className="fill-current w-4 h-4 mr-2" />
                          <span>LinkedIn</span>
                        </button>
                      </a>
                    </Link>
                  )}
                  {userFirestore.youtube && (
                    <button
                      type="button"
                      className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <FaYoutube className="fill-current w-4 h-4 mr-2" />
                      <span>YouTube</span>
                    </button>
                  )}
                  {userFirestore.facebook && (
                    <Link href={`${socialLinks.facebook}`}>
                      <a target="_blank">
                        <button
                          type="button"
                          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          <FaFacebookF className="fill-current w-4 h-4 mr-2" />
                          <span>Facebook</span>
                        </button>
                      </a>
                    </Link>
                  )}
                  {userFirestore.twitter && (
                    <Link href={`${socialLinks.twitter}`}>
                      <a target="_blank">
                        <button
                          type="button"
                          className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          <FaTwitter className="fill-current w-4 h-4 mr-2" />
                          <span>Twitter</span>
                        </button>
                      </a>
                    </Link>
                  )}
                  {userFirestore.github && (
                    <button
                      type="button"
                      className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <FaGithubAlt className="fill-current w-4 h-4 mr-2" />
                      <span>GitHub</span>
                    </button>
                  )}
                  {userFirestore.medium && (
                    <button
                      type="button"
                      className="m-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <FaMediumM className="fill-current w-4 h-4 mr-2" />
                      <span>Medium</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {edit && (
              <form className="w-full px-4" onSubmit={onValidators}>
                <div className="mb-6">
                  <label
                    className="block text-gray-500 font-bold  mb-1 pr-4"
                    htmlFor="displayName"
                  >
                    Nome
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 
                          rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                          focus:bg-white focus:border-purple-500"
                      id="displayName"
                      type="text"
                      value={userFirestore.displayName}
                      onChange={evt => {
                        handlerChangeForm('displayName', evt.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-500 font-bold pr-4"
                    htmlFor="username"
                  >
                    Usuário
                    <input
                      className="bg-gray-100 appearance-none border-2 border-gray-200 rounded 
                      w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="username"
                      type="text"
                      value={userFirestore.username}
                      disabled
                    />
                  </label>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-500 font-bold pr-4"
                    htmlFor="email"
                  >
                    E-mail
                    <input
                      className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="email"
                      type="email"
                      value={userFirestore.email}
                      disabled
                    />
                  </label>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-500 font-bold pr-4"
                    htmlFor="bio"
                  >
                    Bio
                    <textarea
                      rows="5"
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="bio"
                      type="text"
                      value={userFirestore.bio || ''}
                      onChange={evt => {
                        handlerChangeForm('bio', evt.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-500 font-bold pr-4"
                    htmlFor="facebook"
                  >
                    Social
                    <input
                      className="my-1 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="facebook"
                      type="text"
                      placeholder="Facebook"
                      value={userFirestore.facebook || ''}
                      onChange={evt => {
                        handlerChangeForm('facebook', evt.target.value);
                      }}
                    />
                    <input
                      className="my-1 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="instagram"
                      type="text"
                      placeholder="Instagram"
                      value={userFirestore.instagram || ''}
                      onChange={evt => {
                        handlerChangeForm('instagram', evt.target.value);
                      }}
                    />
                    <input
                      className="my-1 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="twitter"
                      type="text"
                      placeholder="Twitter"
                      value={userFirestore.twitter || ''}
                      onChange={evt => {
                        handlerChangeForm('twitter', evt.target.value);
                      }}
                    />
                    <input
                      className="my-1 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="linkedin"
                      type="text"
                      value={userFirestore.linkedin || ''}
                      onChange={evt => {
                        handlerChangeForm('linkedin', evt.target.value);
                      }}
                      placeholder="LinkedIn"
                    />
                  </label>
                </div>
                {!loading && (
                  <div className="flex justify-end">
                    <button
                      className="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Salvar
                    </button>
                  </div>
                )}
                {loading && (
                  <div className="flex justify-end">
                    <div className="mr-4 cursor-wait w-24 bg-blue-700 py-2 px-4 rounded flex justify-center">
                      <Loader />
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
