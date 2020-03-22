import React from 'react';
import ListHashmaps from 'app/components/home/list-hashmaps/list-hashmaps';
import TopHashmaps from 'app/components/home/top-hashmaps/top-hashmaps';

const HomeComponent = ({ hashmaps }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {hashmaps.length > 0 &&
            hashmaps.map(hashmap => (
              <ListHashmaps key={hashmap.key} hashmap={hashmap} />
            ))}
        </div>
        <div className="col-lg-3">
          <TopHashmaps />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
