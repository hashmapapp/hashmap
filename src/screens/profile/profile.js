import React from 'react';
import Item from 'app/components/home/list-hashmaps/list-hashmaps';

const Profile = ({ profile, hashmaps }) => {
  return (
    <div className="container mx-auto">
      <div className="rounded-lg">
        <img
          className="my-8 h-32 w-32 rounded-full mx-auto"
          src={profile.photoUrl}
          alt="Perfil"
        />
        <div className="text-center pt-2">
          <h2 className="text-lg">{profile.displayName}</h2>
        </div>
      </div>
      <div className="m-2 md:m-16 grid grid-cols-6 gap-4 ">
        {hashmaps.length > 0 &&
          hashmaps.map(hashmap => (
            <div key={hashmap.key} className="col-span-6 xl:col-span-3">
              <Item hashmap={hashmap} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
