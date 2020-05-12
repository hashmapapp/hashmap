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
import CircleLoader from 'app/components/UI/loader/circle';
import { replaceLink } from '../lib/replaceLinks';

const Profile = ({ profile, hashmaps }) => {
  const [socialLinks, setSocialLinks] = useState({});

  useMemo(() => {
    const links = {};
    links.instagram = replaceLink(profile.instagram, 'instagram');
    links.twitter = replaceLink(profile.twitter, 'twitter');
    links.linkedin = replaceLink(profile.linkedin, 'linkedin');
    links.facebook = replaceLink(profile.facebook, 'facebook');
    setSocialLinks(links);
  }, [profile]);

  return (
    <div className="container mx-auto">
      <div className="rounded-lg">
        {profile.photoURL && profile.photoURL.url ? (
          <img
            className="mt-8 mb-6 h-32 w-32 rounded-full mx-auto"
            src={profile.photoURL.url}
            alt="Perfil"
          />
        ) : (
          <img
            className="mt-8 mb-6 h-32 w-32 rounded-full mx-auto"
            src="imgs/avatar/avatar.jpg"
            alt="Perfil"
          />
        )}
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

      {!hashmaps && (
        <div className="w-full justify-center h-64 flex items-end">
          <CircleLoader className="flex-1" />
        </div>
      )}

      {hashmaps &&
        (hashmaps.length > 0 ? (
          <div className="m-1 md:m-16 grid grid-cols-6 gap-4 ">
            {hashmaps.map(hashmap => (
              <div key={hashmap.key} className="col-span-6 xl:col-span-3">
                <Item hashmap={hashmap} />
              </div>
            ))}
          </div>
        ) : (
          <div className="md:px-64 text-center">
            <img
              className="md:hidden px-24 pt-8"
              src="imgs/icons/empty.svg"
              alt="authentication"
            />
            <img
              className="hidden md:block px-24 pt-16 w-full"
              src="imgs/icons/empty.svg"
              alt="authentication"
              style={{ height: 300 }}
            />
            <p className="pt-4 md:pb-12 md:pt-12 font-sans text-lg text-gray-600 text-center">
              Hashmaps incríveis em breve!
            </p>
          </div>
        ))}
    </div>
  );
};

export default Profile;
