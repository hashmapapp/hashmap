import React from 'react';
import ListHashmaps from 'app/components/home/list-hashmaps/list-hashmaps';
import TopHashmaps from 'app/components/home/top-hashmaps/top-hashmaps';

const HomeComponent = ({ hashmaps }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {hashmaps &&
            hashmaps.map(hashmap => (
              <>
                <ListHashmaps key={hashmap.id} data={hashmap} />
                <hr />
              </>
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
