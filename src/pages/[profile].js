import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import Profile from 'app/screens/profile/profile';
import { loadFirebaseStore } from 'app/lib/db';
import {
  USERS_COLLECTION,
  HASHMAPS_COLLECTION,
} from 'app/screens/lib/constants';
import HourglasLoader from 'app/components/UI/loader/hourglass';
import DynamicHead from 'app/components/UI/head/dynamic-head';

export default ({ profile, hashmaps }) => {
  return (
    <>
      <DynamicHead
        titleText={profile ? `${profile.displayName} - Hashmap` : undefined}
        description={profile ? profile.bio : undefined}
        imageUrl={
          profile && profile.photoURL && profile.photoURL.url
            ? profile.photoURL.url
            : undefined
        }
      />
      {profile ? (
        <div className="h-screen">
          <UINavBar typeNav="profile" />
          <div className="flex justify-center items-center">
            {profile ? (
              <Profile profile={profile} hashmaps={hashmaps} />
            ) : (
              <div className="w-full justify-center h-64 flex items-end">
                <HourglasLoader className="flex-1" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <UINavBar typeNav="profile" />
          <div className="md:px-64 text-center pt-16 md:pt-32">
            <img
              className="px-24 pt-8"
              src="imgs/icons/page_not_found.svg"
              alt="not found page"
            />
            <p className="pt-8 md:pb-12 md:pt-12 font-sans text-lg text-gray-600 text-center">
              Página não encontrada :(
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const fb = loadFirebaseStore();
  const profileRef = fb().collection(USERS_COLLECTION);
  let profile;
  const hashmaps = [];
  try {
    const dataProfile = await profileRef
      .where('username', '==', params.profile)
      .get();
    if (dataProfile.size === 1) {
      let key;
      dataProfile.forEach(p => {
        key = p.id;
        profile = { ...p.data(), key: p.id };
      });
      const hashmpasRef = fb().collection(HASHMAPS_COLLECTION);
      const hashmapData = await hashmpasRef
        .where('author', '==', key)
        .orderBy('updatedAt', 'desc')
        .get();
      if (hashmapData.size > 0) {
        hashmapData.forEach(doc => {
          const aux = { ...doc.data(), key: doc.id };
          aux.createdAt = aux.createdAt.toDate().toISOString();
          aux.updatedAt = aux.updatedAt.toDate().toISOString();
          hashmaps.push(aux);
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return { props: { profile, hashmaps } };
}
