import React, { useState } from 'react';
import Link from 'next/link';
import Loader from 'app/components/UI/loader/loader';
import AuthenticationServiceFirebase from 'app/services/authentication.service';
import Router from 'next/router';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const onValidators = evt => {
    evt.preventDefault();
    const auth = new AuthenticationServiceFirebase();
    const nameIsValid = name !== '';
    const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const passwordIsValid = password !== '' && password.length >= 6;
    const passwordConfirmValid =
      passwordConfirm !== '' && password === passwordConfirm;

    setNameError(!nameIsValid);
    setEmailError(!emailIsValid);
    setPasswordError(!passwordIsValid);
    setPasswordConfirmError(!passwordConfirmValid);

    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordConfirmValid
    ) {
      setLoading(true);
      auth.createAccount(name, email, password, () => {
        Router.push('/settings');
      });
    }
  };

  return (
    <div className="w-full max-w-xs">
      <img className="p-4" src="imgs/icons/singup.svg" alt="authentication" />
      <form
        className="px-8 bg-white shadow-md rounded pt-6 pb-8 mb-4"
        onSubmit={onValidators}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              ${nameError && 'border border-red-500'}`}
              id="name"
              type="text"
              placeholder="Como quer ser chamad@?"
              value={name}
              onChange={evt => setName(evt.target.value)}
            />
          </label>
        </div>
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
              placeholder="Será seu nome de usuário"
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
              className={`shadow appearance-none rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              ${passwordError && 'border border-red-500'}`}
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={evt => setPassword(evt.target.value)}
            />
          </label>
          {/* <p className="text-red-500 text-xs italic">
            Insira a senha, por favor.
          </p> */}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passwordConfirm"
          >
            Confirme sua senha
            <input
              className={`shadow appearance-none rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
              ${passwordConfirmError && 'border border-red-500'}`}
              id="passwordConfirm"
              type="password"
              placeholder="******************"
              value={passwordConfirm}
              onChange={evt => setPasswordConfirm(evt.target.value)}
            />
          </label>
        </div>
        {!loading && (
          <div className="flex justify-end">
            <button
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Criar Conta
            </button>
          </div>
        )}
        {loading && (
          <div className="flex justify-end">
            <div className="cursor-wait w-32 bg-blue-700 py-2 px-4 rounded flex justify-center">
              <Loader />
            </div>
          </div>
        )}
        <div className="pt-12 flex justify-center">
          <Link href="/login">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Já possui uma conta?
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

export default SignUp;
