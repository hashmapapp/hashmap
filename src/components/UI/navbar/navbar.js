import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { loadFirebaseAuth } from 'app/lib/db';

const Avatar = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const user = loadFirebaseAuth().currentUser;
  return (
    <header className="shadow-lg">
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
          <div className="sm:hidden">
            <button
              type="button"
              className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
              onClick={() => {
                setShowNav(!showNav);
              }}
            >
              {user ? (
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
        </div>
        <nav
          className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${
            showNav ? 'block' : 'hidden'
          }`}
        >
          <Link href="/">
            <a className="uppercase block px-2 py-1 font-semibold rounded hover:bg-gray-100">
              Criar Hashmap
            </a>
          </Link>
          <Link href="/">
            <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
              Trips
            </a>
          </Link>
          <Link href="/">
            <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
              Messages
            </a>
          </Link>
          <button
            type="button"
            className="hidden sm:block px-8 text-gray-500 hover:text-white focus:text-white focus:outline-none"
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            {user ? (
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
