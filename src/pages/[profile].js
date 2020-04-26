import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UINavBar from 'app/components/UI/navbar/navbar';
import Profile from 'app/screens/profile/profile';
import { loadFirebaseStore, loadFirebaseAuth } from 'app/lib/db';
import { USERS_COLLECTION } from 'app/screens/lib/constants';
import HourglasLoader from 'app/components/UI/loader/hourglass';

const HASHMAPS_COLLECTION = 'hashmaps';

export default function Post() {
  const current = loadFirebaseAuth().currentUser;
  const router = useRouter();
  const [profile, setProfile] = useState();
  const [hashmaps, setHashmaps] = useState();
  const [notFoundUser, setNotFoundUser] = useState();

  useEffect(() => {
    if (router && router.query.profile) {
      const fb = loadFirebaseStore();
      const profileRef = fb().collection(USERS_COLLECTION);
      profileRef
        .where('username', '==', router.query.profile)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching users. ', router.query.profile);
            setNotFoundUser(router.query.profile);
            return;
          }

          if (snapshot.size === 1) {
            snapshot.forEach(doc => {
              const key = doc.id;
              setProfile({ ...doc.data(), key });
              const hashmpasRef = fb().collection(HASHMAPS_COLLECTION);
              hashmpasRef
                .where('author', '==', key)
                .orderBy('updatedAt', 'desc')
                .get()
                .then(snapshots => {
                  if (snapshots.empty) {
                    console.log('No matching hashmaps.');
                    setHashmaps([]);
                    return;
                  }
                  if (snapshots.size > 0) {
                    const maps = [];
                    snapshots.forEach(snap => {
                      maps.push({ ...snap.data(), key: snap.id });
                    });
                    setHashmaps(maps);
                  } else {
                    setHashmaps([]);
                  }
                })
                .catch(err => {
                  console.log('Error getting documents', err);
                });
            });
          }
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
  }, [router]);

  return (
    <>
      {!notFoundUser ? (
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
              alt="authentication"
            />
            <p className="pt-8 md:pb-12 md:pt-12 font-sans text-lg text-gray-600 text-center">
              Usuário @{notFoundUser} não foi encontrado
            </p>
          </div>
        </div>
      )}
    </>
  );
}
