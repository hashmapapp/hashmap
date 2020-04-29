import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const Item = ({ hashmap }) => {
  return (
    <Wrapper className="md:max-w-sm w-full md:max-w-full md:flex h-full">
      <ImageWrapper
        className="h-48 md:h-auto md:w-64 flex-none bg-cover rounded-t-md md:rounded-l-lg 
        text-center overflow-hidden md:w-56"
        style={{ backgroundImage: `url('${hashmap.imageUrl}')` }}
        title={hashmap.textImage}
        onClick={() => {
          Router.push(`/view?key=${hashmap.key}`);
        }}
      />

      <div
        className="md:rounded-r-lg p-4 flex flex-col justify-between 
      leading-normal shadow-xl w-full bg-white"
      >
        <div className="">
          <Link href={`/view?key=${hashmap.key}`}>
            <a>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {hashmap.title}
              </div>
            </a>
          </Link>
          <p className="text-gray-700 text-base">{hashmap.subtitle}</p>
        </div>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="imgs/avatar/avatar.png"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

Item.propTypes = {
  hashmap: PropTypes.shape().isRequired,
};

export default Item;
