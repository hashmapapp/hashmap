import React from 'react';
import { FaEdit } from 'react-icons/fa';

const CreateHashmapMobile = ({ handlerCreate }) => {
  return (
    <button
      type="button"
      className="border my-6 mx-4 max-w-sm rounded-lg overflow-hidden shadow-lg"
      onClick={handlerCreate}
    >
      <img
        className="w-full px-6 p-4"
        src="imgs/icons/add_post_4.svg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-2">
        <div className="flex justify-center">
          <FaEdit size={22} className="mx-2" color="#4a5568" />
          <span className="font-bold text-lg text-gray-700">
            Crie uma Publicação
          </span>
        </div>
      </div>
    </button>
  );
};

export default CreateHashmapMobile;
