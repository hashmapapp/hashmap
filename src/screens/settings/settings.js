import React, { useEffect, useState, useMemo } from 'react';
import { loadFirebaseAuth, loadFirebaseStore } from 'app/lib/db';

const USERS_COLLECTION = 'users';

const Settings = () => {
  const userLog = loadFirebaseAuth().currentUser;
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    if (userLog) {
      const fb = loadFirebaseStore();
      const userRef = fb()
        .collection(USERS_COLLECTION)
        .doc(userLog.uid);
      userRef
        .get()
        .then(userDoc => {
          if (!userDoc.exists) {
            console.log('No such document!');
          } else {
            // console.log('Document data:', userDoc.data());
            setUser(userDoc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }, [userLog]);

  useMemo(() => {
    if (user) {
      if (user.role === 'default') setRole('Padrão');
      if (user.role === 'productor') setRole('Produtor');
      if (user.role === 'admin') setRole('Administrador');
    }
  }, [user]);

  return (
    <>
      {userLog && user && (
        <div className="container mx-auto">
          <div className="rounded-lg">
            {user.photoUrl ? (
              <img
                className="my-8 h-32 w-32 rounded-full mx-auto"
                src={user.photoUrl}
                alt="Perfil"
              />
            ) : (
              <img
                className="my-8 h-32 w-32 rounded-full mx-auto"
                src="imgs/avatar/avatar.jpg"
                alt="Perfil"
              />
            )}
            <div className="text-center pt-2">
              <h2 className="text-lg">{role}</h2>
              <h2 className="text-lg">{user.displayName}</h2>
              <h2 className="text-lg">{userLog.email}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
