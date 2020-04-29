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
    <header className="bg-gray-100">
      <div className="container mx-auto px-10 md:px-64 md:py-8">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-black">
          {data.title}
        </h1>
        {data.subtitle && (
          <h6 className="pt-3 font-sans text-gray-700 leading-normal">
            {data.subtitle}
          </h6>
        )}
        <p className="py-2 font-sans text-gray-600 text-xs">{info}</p>
      </div>
    </header>
  );
};

header.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default header;
