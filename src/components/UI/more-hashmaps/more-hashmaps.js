import React from 'react';
import Item from './Item';

const SectionMoreHashMaps = () => (
  <div className="bg-gray-200">
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-2 sm:p-8">
          <Item />
        </div>
        <div className="p-2 sm:p-8">
          <Item />
        </div>
        <div className="p-2 sm:p-8">
          <Item />
        </div>
      </div>
    </div>
  </div>
);

export default SectionMoreHashMaps;
