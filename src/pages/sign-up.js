import React, { useEffect } from 'react';
import SignUp from 'app/screens/login/sign-up';
import UINavBar from 'app/components/UI/navbar/navbar';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import { loadFirebaseAuth } from 'app/lib/db';
import Router from 'next/router';

export default () => {
  useEffect(() => {
    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        Router.push('/');
      }
    });
  }, []);
  return (
    <>
      <DynamicHead titleText="SignUp - Hashmap" />
      <div className="h-screen bg-gray-100">
        <UINavBar typeNav="signin" />
        <div className="py-4 md:pt-24 flex justify-center items-center">
          <SignUp />
        </div>
      </div>
    </>
  );
};
