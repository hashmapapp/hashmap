import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import UINavBar from 'app/components/UI/navbar/navbar';
import HomeComponent from 'app/components/home/home';
import CreateHashmapDesktop from 'app/components/UI/create-hashmap/desktop';
import CreateHashmapMobile from 'app/components/UI/create-hashmap/mobile';
import HourglasLoader from 'app/components/UI/loader/hourglass';
import { loadFirebaseAuth } from 'app/lib/db';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashmapReset } from 'app/redux/actions/hashmapActions';

const home = ({ handlerReset, hashmaps, fetchMoreData, hasMoreData }) => {
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
    return () => {
      mounted = false;
    };
  }, []);

  const handlerCreate = () => {
    if (currentUser) {
      handlerReset();
      Router.push('/edit');
    } else {
      Router.push('/login?create=true');
    }
  };

  return (
    <>
      <UINavBar typeNav="home" />
      <div className="hidden md:block">
        <CreateHashmapDesktop handlerCreate={handlerCreate} />
      </div>
      <div className="md:hidden block flex justify-center">
        <CreateHashmapMobile handlerCreate={handlerCreate} />
      </div>
      <hr className="md:pt-12 md:hidden" />
      <h3 className="text-3xl tracking-tight font-extrabold pt-4 md:pt-8 md:text-5xl text-center text-indigo-600">
        Melhores Curadorias
      </h3>
      {!hashmaps ? (
        <div className="w-full justify-center h-64 flex items-end">
          <HourglasLoader className="flex-1" />
        </div>
      ) : (
        <HomeComponent
          hashmaps={hashmaps}
          fetchMoreData={fetchMoreData}
          hasMoreData={hasMoreData}
        />
      )}
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerReset: hashmapReset,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(home);
