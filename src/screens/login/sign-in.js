import React, { useState } from 'react';
import Link from 'next/link';
import Loader from 'app/components/UI/loader/loader';
import AuthenticationServiceFirebase from 'app/services/authentication.service';
import Router from 'next/router';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onValidators = evt => {
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

  return (
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
          <Link href="/">
            <a
              className="inline-block align-baseline font-bold text-sm 
                text-blue-500 hover:text-blue-800"
            >
              Esqueceu a senha?
            </a>
          </Link>
          {!loading && (
            <button
              className="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          )}
          {loading && (
            <div className="cursor-wait w-24 bg-blue-700 py-2 px-4 rounded flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="pt-12 flex justify-center">
          <Link href="/sign-up">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Não tem uma conta ainda?
            </a>
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Hashmap. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default SignIn;
