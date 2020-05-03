import React from 'react';
import Item from 'app/components/home/list-hashmaps/list-hashmaps';
import PropTypes from 'prop-types';

const HomeComponent = ({ hashmaps }) => {
  return (
    <div className="md:m-16 grid grid-cols-6 gap-4 md:bg-white">
      {hashmaps.map(hashmap => {
        return (
          <div key={hashmap.key} className="col-span-6 xl:col-span-3">
            <Item hashmap={hashmap} />
          </div>
        );
      })}
    </div>
  );
};

HomeComponent.propTypes = {
  hashmaps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default HomeComponent;
