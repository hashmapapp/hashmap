import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import HomeComponent from 'app/components/home/home';
import HourglasLoader from 'app/components/UI/loader/hourglass';

const home = ({ hashmaps }) => (
  <>
    <UINavBar typeNav="home" />
    {!hashmaps ? (
      <div className="w-full justify-center h-64 flex items-end">
        <HourglasLoader className="flex-1" />
      </div>
    ) : (
      <HomeComponent hashmaps={hashmaps} />
    )}
  </>
);

export default home;
