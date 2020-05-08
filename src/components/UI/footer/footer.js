import React, { useState, useEffect } from 'react';
import { loadFirebaseAuth } from 'app/lib/db';
import Link from 'next/link';

const Footer = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    let mounted = true;
    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        if (mounted) {
          setCurrentUser(user);
        }
      }
    });
    // eslint-disable-next-line
    return () => (mounted = false);
  }, []);
  return (
    <>
      {!currentUser && (
        <div className="bg-gray-200">
          <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Ready to dive in?
              <br />
              <span className="text-indigo-600">
                Start your free trial today.
              </span>
            </h2>
            <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
              <div className="inline-flex rounded-md shadow">
                <Link href="/login">
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Get started
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
