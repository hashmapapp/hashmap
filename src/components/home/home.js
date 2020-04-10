import React from 'react';
import Item from 'app/components/home/list-hashmaps/list-hashmaps';
import PropTypes from 'prop-types';

const orders = [
  ['col-span-6 xl:col-span-4', 'col-span-6 xl:col-span-2'],
  ['col-span-6 xl:col-span-2', 'col-span-6 xl:col-span-4'],
  ['col-span-6 xl:col-span-3', 'col-span-6 xl:col-span-3'],
  [
    'col-span-6 xl:col-span-2',
    'col-span-6 xl:col-span-2',
    'col-span-6 xl:col-span-2',
  ],
];

let index = 0;
let size = 1;
let order = 0;

const HomeComponent = ({ hashmaps }) => {
  return (
    <div className="m-2 md:m-16 grid grid-cols-6 gap-4 ">
      {hashmaps.length > 0 &&
        hashmaps.map(hashmap => {
          if (index === size - 1) {
            order = orders[Math.floor(Math.random() * orders.length)];
            size = order.length;
            index = 0;
          } else index += 1;
          return (
            <div key={hashmap.key} className={order[index]}>
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
