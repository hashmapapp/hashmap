import React from 'react';
import SignIn from 'app/screens/login/sign-in';
import UINavBar from 'app/components/UI/navbar/navbar';
import DynamicHead from 'app/components/UI/head/dynamic-head';

export default () => (
  <>
    <DynamicHead titleText="Login - Hashmap" />
    <div className="h-screen bg-gray-100">
      <UINavBar typeNav="signup" />
      <div className="py-6 md:pt-32 flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  </>
);
