import React from 'react';
import PropTypes from 'prop-types';

const footer = ({ data }) => (
  <div className="container mx-auto sm:py-8 md:px-64">
    <div className="md:flex bg-white rounded-lg p-6">
      <img
        className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        src="imgs/avatar/avatar.jpg"
        alt="Perfil"
      />
      <div className="text-center md:text-left pt-2">
        <h2 className="text-lg">Erin Lindford</h2>
        <div className="text-purple-500">Customer Support</div>
        <div className="text-gray-600">erinlindford@example.com</div>
        <div className="text-gray-600">(555) 765-4321</div>
      </div>
    </div>
  </div>
);

footer.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default footer;
