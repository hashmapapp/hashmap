import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Section = styled.section`
  background-color: #fafafa;
`;

const SectionMoreHashMaps = () => (
  <Section>
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
  </Section>
);

export default SectionMoreHashMaps;
