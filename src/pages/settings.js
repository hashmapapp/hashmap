import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import Settings from 'app/screens/settings/settings';

export default () => (
  <div className="h-screen">
    <UINavBar typeNav="signup" />
    <div className="py-6 md:pt-32 flex justify-center items-center">
      <Settings />
    </div>
  </div>
);
