import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import UINavBar from 'app/components/UI/navbar/navbar';
import Profile from 'app/screens/profile/profile';
import { loadFirebaseStore } from 'app/lib/db';

const USERS_COLLECTION = 'users';
const HASHMAPS_COLLECTION = 'hashmaps';

export default function Post() {
  const router = useRouter();
  const [profile, setProfile] = useState();
  const [hashmaps, setHashmaps] = useState([]);

  useEffect(() => {
    if (router && router.query.profile) {
      const fb = loadFirebaseStore();
      const profileRef = fb().collection(USERS_COLLECTION);
      profileRef
        .where('username', '==', router.query.profile)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching users.');
            return;
          }

          if (snapshot.size === 1) {
            snapshot.forEach(doc => {
              // console.log(doc.id, '=>', doc.data());
              const key = doc.id;
              setProfile({ ...doc.data(), key });
              const hashmpasRef = fb().collection(HASHMAPS_COLLECTION);
              hashmpasRef
                .where('author', '==', key)
                .get()
                .then(snapshots => {
                  if (snapshots.empty) {
                    console.log('No matching hashmaps.');
                    return;
                  }
                  if (snapshots.size > 0) {
                    const maps = [];
                    snapshots.forEach(snap => {
                      // console.log(snap.id, '=>', snap.data());
                      maps.push({ ...snap.data(), key: snap.id });
                    });
                    setHashmaps(maps);
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
    <div className="h-screen ">
      {/* <UINavBar typeNav="signup" /> */}
      <div className="flex justify-center items-center">
        {profile && <Profile profile={profile} hashmaps={hashmaps} />}
      </div>
    </div>
  );
}
