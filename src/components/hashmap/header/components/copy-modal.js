import React from 'react';
import { connect } from 'react-redux';

// Components
import UIModal from 'app/components/UI/modal/modal';

const CopyModal = ({ closeModal }) => {

  return (
    <>
      <UIModal closeModal={closeModal} center>
        <div className="flex justify-center bg-white font-bold px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          Deseja copiar esse hashmap para sua home?
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-black 
                  text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 
                  focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Copiar
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Cancelar
            </button>
          </span>
        </div>
      </UIModal>
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(CopyModal);
