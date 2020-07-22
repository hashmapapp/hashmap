import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CollaborateModal from './components/collaborate-modal';

const header = ({ data }) => {
  const [info, setInfo] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useMemo(() => {
    moment.locale('pt-br');
    if (data.createdAt < data.updatedAt) {
      setInfo(`Atualizada em ${moment(data.updatedAt).format('LL')}`);
    } else {
      setInfo(`${moment(data.createdAt).format('LL')}`);
    }
  }, [data]);

  return (
    <header>
      <div className="container mx-auto px-10 md:px-8 py-8">
        <h1 className="font-sans leading-tight text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-black">
          {data.title}
        </h1>
        {data.subtitle && (
          <h6 className="pt-3 font-sans text-gray-700 leading-normal">
            {data.subtitle}
          </h6>
        )}
        <p className="py-2 font-sans text-gray-600 text-xs">{info}</p>
        <div className="flex">
          <button
            className="w-full justify-center bg-gray-300 
            text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center
            md:w-auto
            hover:bg-gray-400"
          >
            <span>Copiar hashmap</span>
          </button>
          <button
            className="w-full justify-center ml-3 bg-gray-300 
            text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center
            md:w-auto
            hover:bg-gray-400"
            onClick={openModal}
          >
            <span>Colaborar</span>
          </button>
        </div>
      </div>

      {modalIsOpen && <CollaborateModal closeModal={closeModal} />}
    </header>
  );
};

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
