import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import moment from 'moment';

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const Item = ({ hashmap }) => {
  const [info, setInfo] = useState('');
  useMemo(() => {
    moment.locale('pt-br');
    if (hashmap.createdAt) setInfo(`${moment(hashmap.createdAt).format('LL')}`);
  }, [hashmap]);

  return (
    <Wrapper className="md:max-w-sm w-full md:max-w-full md:flex h-full px-4 py-2">
      <ImageWrapper
        className="h-48 md:h-auto md:w-64 flex-none bg-cover rounded-t-lg md:rounded-l-lg 
        text-center overflow-hidden md:w-56"
        style={{ backgroundImage: `url('${hashmap.imageUrl}')` }}
        title={hashmap.title}
        onClick={() => {
          Router.push(`/view?key=${hashmap.key}`);
        }}
      />

      <div
        className="md:rounded-r-lg p-4 flex flex-col justify-between rounded-b-lg
      leading-normal shadow-xl w-full bg-white"
      >
        <div className="">
          <Link href={`/view?key=${hashmap.key}`}>
            <a>
              <div className="leading-snug font-medium text-gray-900 text-xl mb-2">
                {hashmap.title}
              </div>
            </a>
          </Link>
          <p className="leading-snug font-light text-gray-700 text-base">
            {hashmap.subtitle}
          </p>
        </div>
        {hashmap.authorData && hashmap.authorData.username && (
          <div className="flex items-center mt-4">
            <Link href="/[profile]" as={`/${hashmap.authorData.username}`}>
              <a>
                {hashmap.authorData.imageUrl ? (
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={hashmap.authorData.imageUrl}
                    alt={`Avatar de ${hashmap.authorData.name}`}
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="imgs/avatar/avatar.png"
                    alt={`Avatar de ${hashmap.authorData.name}`}
                  />
                )}
              </a>
            </Link>
            <div className="text-sm">
              <Link href="/[profile]" as={`/${hashmap.authorData.username}`}>
                <a>
                  <p className="text-gray-900 leading-none">
                    {hashmap.authorData.name}
                  </p>
                </a>
              </Link>
              <p className="pt-1 text-xs text-gray-600">{info}</p>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

Item.propTypes = {
  hashmap: PropTypes.shape().isRequired,
};

export default Item;
