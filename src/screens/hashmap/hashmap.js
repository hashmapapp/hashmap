import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmap from 'app/components/hashmap/hashmap';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';

const hashmap = () => (
  <>
    <UINavBar />
    <SectionHashmap />
    <UISectionComments />
    <UISectionMoreHashMaps />
    <UIFooter />
  </>
);

export default hashmap;
