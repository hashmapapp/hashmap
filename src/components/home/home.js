import React from 'react';
import ListHashmaps from 'app/components/home/list-hashmaps/list-hashmaps';
import PropTypes from 'prop-types';

const HomeComponent = ({ hashmaps }) => {
  let hashmap1;
  let hashmap2;
  let hashmap3;
  let hashmap4;
  let hashmap5;
  if (hashmaps.length > 0) {
    [hashmap1, hashmap2, hashmap3, hashmap4, hashmap5] = hashmaps;
  }
  // return (
  //   <div className="container">
  //     {hashmaps.length > 0 &&
  //       hashmaps.map(hashmap => (
  //         <ListHashmaps key={hashmap.key} hashmap={hashmap} />
  //       ))}
  //   </div>
  // );

  return (
    <>
      (
      <div className="m-16 grid grid-cols-6 gap-4">
        {hashmap5 && (
          <div className="col-span-4">
            <ListHashmaps hashmap={hashmap5} />
          </div>
        )}
        {hashmap2 && (
          <div className="col-span-2">
            <ListHashmaps hashmap={hashmap2} />
          </div>
        )}
        {hashmap3 && (
          <div className="col-span-2">
            <ListHashmaps hashmap={hashmap3} />
          </div>
        )}
        {hashmap1 && (
          <div className="col-span-4">
            <ListHashmaps hashmap={hashmap1} />
          </div>
        )}
        {hashmap4 && (
          <div className="col-span-2">
            <ListHashmaps hashmap={hashmap4} />
          </div>
        )}
        {hashmap3 && (
          <div className="col-span-2">
            <ListHashmaps hashmap={hashmap3} />
          </div>
        )}
        {hashmap1 && (
          <div className="col-span-2">
            <ListHashmaps hashmap={hashmap1} />
          </div>
        )}
        {hashmap3 && (
          <div className="col-span-3">
            <ListHashmaps hashmap={hashmap3} />
          </div>
        )}
        {hashmap1 && (
          <div className="col-span-3">
            <ListHashmaps hashmap={hashmap1} />
          </div>
        )}
      </div>
      )
    </>
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
