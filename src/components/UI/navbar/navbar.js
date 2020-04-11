import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { loadFirebaseAuth } from 'app/lib/db';
import { MdClose } from 'react-icons/md';
import AuthenticationServiceFirebase from 'app/services/authentication.service';
import { TiThMenu } from 'react-icons/ti';
import AccountDropdown from './account-dropdown';

const Avatar = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DivButton = styled.div`
  cursor: pointer;
`;

const NavBar = ({ typeNav = 'signin' }) => {
  const [showNav, setShowNav] = useState(false);
  const user = loadFirebaseAuth().currentUser;
  const signOut = () => {
    const auth = new AuthenticationServiceFirebase();
    auth.signOut(() => Router.push('/login'));
  };
  return (
    <header className="shadow-lg bg-gray-100">
      <div className="container mx-auto sm:px-24 sm:flex sm:justify-between sm:items:center sm:px-4 sm:py-3">
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div>
            <Link href="/">
              <a>
                <img
                  src="/imgs/logo/default-logo.png"
                  className="h-8"
                  alt="logo"
                />
              </a>
            </Link>
          </div>
          {user ? (
            <div className="sm:hidden">
              <button
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                {user.photoURL ? (
                  <Avatar
                    className="h-8 w-8 rounded-full mx-auto"
                    src={user.photoURL}
                  />
                ) : (
                  <Avatar
                    className="h-8 w-8 rounded-full mx-auto"
                    src="imgs/avatar/avatar.jpg"
                  />
                )}
              </button>
            </div>
          ) : (
            <div className="sm:hidden">
              <button
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                {showNav && (
                  <div style={{ color: 'black' }}>
                    <MdClose />
                  </div>
                )}
                {!showNav && (
                  <div style={{ color: 'black' }}>
                    <TiThMenu />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
        <nav
          className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${
            showNav ? 'block' : 'hidden'
          }`}
        >
          {user && (
            <Link href="/">
              <a className="md:hidden uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
                Meu Perfil
              </a>
            </Link>
          )}
          {user && (
            <DivButton
              onClick={signOut}
              className="md:hidden uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2"
            >
              Sair
            </DivButton>
          )}
          {!user && typeNav === 'signin' && (
            <Link href="/login">
              <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
                Entrar
              </a>
            </Link>
          )}
          {!user && typeNav === 'signup' && (
            <Link href="/sign-up">
              <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
                Criar Conta
              </a>
            </Link>
          )}
          {user && <AccountDropdown user={user} signOut={signOut} />}
        </nav>
      </div>
    </header>
  );
};

NavBar.propTypes = {
  // fixed: PropTypes.bool,
};

NavBar.defaultProps = {
  fixed: false,
};

export default NavBar;
