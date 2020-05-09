import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useOutsideAlerter } from '../lib/use-outside-alerter';

const ItemDrop = styled.div`
  cursor: pointer;
`;

const AccountDropdown = ({ user, signOut }) => {
  const [showNav, setShowNav] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowNav);
  return (
    <>
      <div className="relative px-4 hidden sm:block" ref={wrapperRef}>
        <button
          type="button"
          className="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
          onClick={() => {
            setShowNav(!showNav);
          }}
        >
          {user.photoURL ? (
            <img
              className="h-full w-full object-cover"
              src={user.photoURL}
              alt="Your avatar"
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src="imgs/avatar/avatar.jpg"
              alt="Your avatar"
            />
          )}
        </button>
        <div
          className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl ${
            showNav ? 'block' : 'hidden'
          }`}
        >
          <Link href="/settings">
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-600 hover:text-white">
              Perfil
            </a>
          </Link>
          <ItemDrop
            className="block px-4 py-2 text-gray-800 hover:bg-gray-600 hover:text-white"
            onClick={signOut}
          >
            Sair
          </ItemDrop>
        </div>
      </div>
    </>
  );
};

export default AccountDropdown;
