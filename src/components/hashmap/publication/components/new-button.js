import React from 'react';
import PropTypes from 'prop-types';

const NewPublication = ({ onAction }) => (
  <div className="w-full flex items-center my-8">
    <button
      type="button"
      className="flex-1 h-16 bg-white hover:bg-gray-100 text-2xl text-gray-800 font-semibold py-2 px-4 
    border border-gray-400 rounded-full shadow"
      onClick={onAction}
    >
      + Adicionar
    </button>
  </div>
);

NewPublication.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default NewPublication;
