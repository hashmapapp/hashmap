import React from 'react';
import { connect } from 'react-redux';

// Components
import UIModal from 'app/components/UI/modal/modal';

const CollaborateModal = ({ closeModal }) => {

  return (
    <>
      <UIModal closeModal={closeModal} center={true}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          Teste
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Continuar Editando
            </button>
          </span>
        </div>
      </UIModal>
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(CollaborateModal);
