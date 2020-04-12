import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import Profile from 'app/screens/profile/profile';

export default () => (
  <div className="h-screen bg-gray-100">
    <UINavBar typeNav="signup" />
    <div className="py-6 md:pt-32 flex justify-center items-center">
      <Profile />
    </div>
  </div>
);
