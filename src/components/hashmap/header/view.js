import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const header = ({ data }) => {
  const [info, setInfo] = useState('');
  useMemo(() => {
    moment.locale('pt-br');
    if (data.createdAt !== data.updatedAt) {
      setInfo(`Atualizada em ${moment(data.updatedAt).format('LL')}`);
    } else {
      setInfo(`${moment(data.createdAt).format('LL')}`);
    }
  }, [data]);

  return (
    <header style={{ backgroundColor: '#fafafa' }}>
      <div className="container mx-auto px-4 md:px-64 md:py-8">
        <h1 className="font-sans text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-black">
          {data.title}
        </h1>
        <h6 className="pt-3 font-sans text-gray-700 leading-normal">
          {data.subtitle}
        </h6>
        <p className="py-4 font-sans text-gray-600 text-xs">{info}</p>
      </div>
    </header>
  );
};

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
