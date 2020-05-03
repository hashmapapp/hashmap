import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import Settings from 'app/screens/settings/settings';
import DynamicHead from 'app/components/UI/head/dynamic-head';

export default () => (
  <>
    <DynamicHead titleText="Meu Perfil - Hashmap" />
    <div className="h-screen">
      <UINavBar typeNav="signup" />
      <div className="py-6 md:pt-12 flex justify-center items-center">
        <Settings />
      </div>
    </div>
  </>
);
