import React, { useMemo } from 'react';
import { loadFirebaseAuth } from 'app/lib/db';

const Profile = () => {
  const user = loadFirebaseAuth().currentUser;
  const role = useMemo(() => {
    const roleAux = localStorage.getItem('@hashmap/role');
    if (roleAux === 'default') return 'Padrão';
    if (roleAux === 'productor') return 'Produtor';
    if (roleAux === 'admin') return 'Administrador';
    return undefined;
  }, []);
  return (
    <div className="container mx-auto sm:py-8">
      <div className="rounded-lg p-6">
        <img
          className="my-8 h-16 w-16 rounded-full mx-auto"
          src="imgs/avatar/avatar.jpg"
          alt="Perfil"
        />
        <div className="text-center pt-2">
          <h2 className="text-lg">{user.displayName}</h2>
          <div className="text-purple-500">{role}</div>
          <div className="text-gray-600">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
