import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Div } from './style';

const ContainerDiv = styled.div`
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const WrapDiv = styled.div`
  padding-right: 15px;
`;

const ReactCount = ({ type, value }) => (
  <WrapDiv>
    <ContainerDiv
      onClick={() => {
        alert(`React ${type}`);
      }}
    >
      {type === 'like' && (
        <Div>
          <Icon src="icons/like.png" />
        </Div>
      )}
      {type === 'heart' && (
        <Div>
          <Icon src="icons/heart.png" />
        </Div>
      )}
      {type === 'unlike' && (
        <Div>
          <Icon src="icons/unlike.png" />
        </Div>
      )}
      {type === 'smiley' && (
        <Div>
          <Icon src="icons/smiley.png" />
        </Div>
      )}
      {type === 'dissatisfied' && (
        <Div>
          <Icon src="icons/dissatisfied.png" />
        </Div>
      )}
      {type === 'rocket' && (
        <Div>
          <Icon src="icons/rocket.png" />
        </Div>
      )}
      {type === 'hooray' && (
        <Div>
          <Icon src="icons/hooray.png" />
        </Div>
      )}
      {type === 'eyes' && (
        <Div>
          <Icon src="icons/eyes.png" />
        </Div>
      )}
      {value}
    </ContainerDiv>
  </WrapDiv>
);

ReactCount.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number,
};

ReactCount.defaultProps = {
  value: 0,
};

export default ReactCount;
