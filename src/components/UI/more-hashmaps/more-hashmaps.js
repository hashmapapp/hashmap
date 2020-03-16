import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Section = styled.section`
  background-color: #fafafa;

  h6 {
    font-family: 'Open Sans Light';
  }
`;

const SectionMoreHashMaps = () => (
  <Section>
    <div className="container pt-4">
      <div className="row justify-content-md-center">
        <div>
          <h6>Mais Hashmaps</h6>
          <hr />
          <div className="row">
            <div className="col">
              <Item />
            </div>
            <div className="col">
              <Item />
            </div>
            <div className="col">
              <Item />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default SectionMoreHashMaps;
