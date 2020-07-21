import React, { useState } from 'react';
import Link from 'next/link';
import Loader from 'app/components/UI/loader/loader';
import UIModal from 'app/components/UI/modal/modal';
import AuthenticationServiceFirebase from 'app/services/authentication.service';
import Router from 'next/router';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSendReset, setLoadingSendReset] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState(false);

  const onValidators = async evt => {
    const auth = new AuthenticationServiceFirebase();
    evt.preventDefault();
    const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const passwordIsValid = password !== '' && password.length >= 6;
    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);
    if (emailIsValid && passwordIsValid) {
      setLoading(true);
      auth.signIn(
        email,
        password,
        () => {
          Router.push('/');
        },
        () => {
          setInvalid(true);
          setLoading(false);
        }
      );
    } else {
      setInvalid(true);
    }
  };

  const handlerSendPasswordResetEmail = () => {
    // console.log('handlerSendPasswordResetEmail');
    setLoadingSendReset(true);
    const auth = new AuthenticationServiceFirebase();
    auth.sendPasswordResetEmail(email, () => {
      setResetEmail(true);
      setLoadingSendReset(false);
    });
  };

  return (
    <>
      {showModal && (
        <UIModal>
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
              {resetEmail ? (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    E-mail enviado com sucesso, verifique sua caixa de e-mails
                  </h3>
                </div>
              ) : (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Solicitar uma nova senha para o e-mail:
                  </h3>
                  <p>{email}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {!resetEmail &&
              (loadingSendReset ? (
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
                    onClick={handlerSendPasswordResetEmail}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-black 
                  text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 
                  focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Soliciar
                  </button>
                </span>
              ))}
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                disabled={loadingSendReset}
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white 
                  text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none 
                  focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {!resetEmail ? 'Cancelar' : 'Fechar'}
              </button>
            </span>
          </div>
        </UIModal>
      )}
      <div className="w-full max-w-xs">
        <img
          className="p-4"
          src="imgs/icons/authentication.svg"
          alt="authentication"
        />
        <form
          className="px-8 bg-white shadow-md rounded pt-6 pb-8 mb-4"
          onSubmit={onValidators}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              ${emailError && 'border border-red-500'}`}
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={evt => setEmail(evt.target.value)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
              <input
                className={`shadow appearance-none rounded 
              w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
              focus:outline-none focus:shadow-outline ${passwordError &&
                'border border-red-500'}`}
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={evt => setPassword(evt.target.value)}
              />
            </label>
            {invalid && (
              <p className="text-red-500 text-xs italic">
                Usuário ou senha inválido.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-block align-baseline font-bold text-sm 
                text-black hover:text-gray-800"
            >
              Esqueceu a senha?
            </button>
            {!loading && (
              <button
                className="w-24 bg-black hover:bg-gray-800 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Entrar
              </button>
            )}
            {loading && (
              <div className="cursor-wait w-24 bg-black py-2 px-4 rounded flex justify-center">
                <Loader color="black" />
              </div>
            )}
          </div>
          <div className="pt-12 flex justify-center">
            <Link href="/sign-up">
              <a className="inline-block align-baseline font-bold text-sm text-black hover:text-gray-800">
                Não tem uma conta ainda?
              </a>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Hashmap. Todos os direitos reservados.
        </p>
      </div>
    </>
  );
};

export default SignIn;
