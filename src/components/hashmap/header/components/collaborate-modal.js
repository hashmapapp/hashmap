import React, { useState } from 'react';
import { connect } from 'react-redux';

// Services
import { loadFirebaseAuth } from 'app/lib/db';
import { UserService } from 'app/services/user.service';
import { HashmapService } from 'app/services/hashmap.service';

// Components
import UIModal from 'app/components/UI/modal/modal';

const CollaborateModal = ({ closeModal, hashmapKey }) => {
  const [loading, setLoading] = useState(false);

  const submitCollaboration = () => {
    setLoading(true);
    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        const userService = new UserService();
        userService
          .getUserById(uid)
          .then(resolve => {
            if (resolve) {
              HashmapService.saveNotification(
                {
                  creatorId: uid,
                  hashmapId: hashmapKey,
                  notificationType: 'SOLICITACAO_COLABORAR'
                },
                () => {
                  closeModal()
                },
              );
            }
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }
    });
  };

  return (
    <>
      <UIModal closeModal={closeModal} center>
        <div className="flex justify-center bg-white font-bold px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          Deseja solicitar contribução a esse hashmap?
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-black 
                  text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:border-gray-700 
                  focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={submitCollaboration}
            >
              Solicitar
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

export default connect(mapStateToProps, null)(CollaborateModal);
