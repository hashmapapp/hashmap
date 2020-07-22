import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CollaborateModal from './components/collaborate-modal';
import CopyModal from './components/copy-modal';

const header = ({ data }) => {
  const [info, setInfo] = useState('');
  const [hasSolicitation, setHasSolicitation] = useState(true);
  const [modalCollaborateIsOpen, setModalCollaborateIsOpen] = useState(false);
  const [modalCopyIsOpen, setModalCopyIsOpen] = useState(false);

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
      {hasSolicitation &&
        <div
          className="m-5 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Solicitação Pendete!!</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setHasSolicitation(false)}>
            <svg className="fill-current h-6 w-6 text-orange-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      }

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
            onClick={() => setModalCopyIsOpen(true)}
          >
            <span>Copiar hashmap</span>
          </button>
          <button
            className="w-full justify-center ml-3 bg-gray-300 
            text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center
            md:w-auto
            hover:bg-gray-400"
            onClick={() => setModalCollaborateIsOpen(true)}
          >
            <span>Colaborar</span>
          </button>
        </div>
      </div>

      {modalCollaborateIsOpen && <CollaborateModal closeModal={() => setModalCollaborateIsOpen(false)} />}
      {modalCopyIsOpen && <CopyModal closeModal={() => setModalCopyIsOpen(false)} />}
    </header>
  );
};

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
