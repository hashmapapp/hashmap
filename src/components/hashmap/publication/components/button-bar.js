import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import SaveModal from '../save-modal';

const ButtonBar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {modalIsOpen && <SaveModal closeModal={closeModal} />}
      <div
        className="container mx-auto sm:px-24 sm:px-4 sm:py-3 flex justify-end
      border-solid border-t-2"
      >
        <button onClick={openModal} type="button" className="my-2 mr-4 p-2">
          <FiSave size={32} />
        </button>
      </div>
    </>
  );
};

export default ButtonBar;
