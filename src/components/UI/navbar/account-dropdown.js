import React, { useState } from 'react';
import Link from 'next/link';

const AccountDropdown = ({ user }) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className="relative px-4 hidden sm:block">
        <button
          type="button"
          className="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
          onClick={() => {
            setShowNav(!showNav);
          }}
        >
          {user ? (
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
          <Link href="/">
            <a className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
              Account settings
            </a>
          </Link>
          <Link href="/">
            <a className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
              Account settings
            </a>
          </Link>
          <Link href="/">
            <a className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
              Account settings
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccountDropdown;
