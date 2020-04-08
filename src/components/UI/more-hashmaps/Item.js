import React from 'react';
// import styled from 'styled-components';

const Item = () => {
  return (
    <div className="shadow max-w-sm w-full lg:max-w-auto rounded-b-lg">
      <img
        className="rounded-t-lg w-full h-48"
        src="https://picsum.photos/600/400"
        alt="Woman paying for a purchase"
      />

      <div className="bg-white p-4 flex flex-col justify-between leading-normal rounded-b-lg">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl">
            Can coffee make you a better developer?
          </div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://picsum.photos/600/400"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
