import React from 'react';
import SignUp from 'app/screens/login/sign-up';
import UINavBar from 'app/components/UI/navbar/navbar';

export default () => (
  <div className="h-screen bg-gray-100">
    <UINavBar typeNav="signin" />
    <div className="py-4 md:pt-24 flex justify-center items-center">
      <SignUp />
    </div>
  </div>
);
