import React, { useMemo, useState } from 'react';
import Item from 'app/components/home/list-hashmaps/list-hashmaps';
import Link from 'next/link';
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaGithubAlt,
  FaMediumM,
} from 'react-icons/fa';

const Profile = ({ profile, hashmaps }) => {
  const [socialLinks, setSocialLinks] = useState({});

  const replaceLink = link => {
    return link ? `//${link.split('//')[1]}` : undefined;
  };

  useMemo(() => {
    const links = {};
    links.instagram = replaceLink(profile.instagram);
    links.twitter = replaceLink(profile.twitter);
    links.linkedin = replaceLink(profile.linkedin);
    links.facebook = replaceLink(profile.facebook);
    setSocialLinks(links);
  }, [profile]);

  return (
    <div className="container mx-auto">
      <div className="rounded-lg">
        <img
          className="mt-8 mb-6 h-32 w-32 rounded-full mx-auto"
          src={profile.photoURL}
          alt="Perfil"
        />
        <div className="text-center p-4">
          <h2 className="font-bold text-lg">{profile.displayName}</h2>
          <div className="font-bold text-purple-500 text-xs">
            @{profile.username}
          </div>
          <div className="pt-4">
            {profile.instagram && (
              <Link href={`${socialLinks.instagram}`}>
                <a target="_blank">
                  <button
                    type="button"
                    className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <FaInstagram />
                  </button>
                </a>
              </Link>
            )}
            {profile.linkedin && (
              <Link href={`${socialLinks.linkedin}`}>
                <a target="_blank">
                  <button
                    type="button"
                    className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <FaLinkedin />
                  </button>
                </a>
              </Link>
            )}
            {profile.youtube && (
              <button
                type="button"
                className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FaYoutube />
              </button>
            )}
            {profile.facebook && (
              <Link href={`${socialLinks.facebook}`}>
                <a target="_blank">
                  <button
                    type="button"
                    className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <FaFacebookF />
                  </button>
                </a>
              </Link>
            )}
            {profile.twitter && (
              <Link href={`${socialLinks.twitter}`}>
                <a target="_blank">
                  <button
                    type="button"
                    className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <FaTwitter />
                  </button>
                </a>
              </Link>
            )}
            {profile.github && (
              <button
                type="button"
                className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FaGithubAlt />
              </button>
            )}
            {profile.medium && (
              <button
                type="button"
                className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FaMediumM />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="m-1 md:m-16 grid grid-cols-6 gap-4 ">
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
