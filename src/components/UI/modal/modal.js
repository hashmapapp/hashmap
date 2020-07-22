import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const UIModal = ({ children, center }) => {

  return (
    <div
      className={cx("fixed inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center",
        {
          'bottom-0': !center,
        })}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {children}
      </div>
    </div>
  );
};

UIModal.propTypes = {
  center: PropTypes.bool,
};

UIModal.defaultProps = {
  center: false,
};

export default UIModal;
