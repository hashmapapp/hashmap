import React from 'react';
import PropTypes from 'prop-types';

const header = ({ data }) => (
  <header>
    <h1 className="font-sans text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-black">
      {data.title}
    </h1>
    <h6 className="pt-3 font-sans text-gray-700 leading-normal">
      {data.subtitle}
    </h6>
    <p className="pt-1 pb-4 font-sans text-gray-600 text-xs">
      04 de Abril · 7 Publicações
    </p>
  </header>
);

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
