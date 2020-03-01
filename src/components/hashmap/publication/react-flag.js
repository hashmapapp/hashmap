import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerDiv = styled.div`
  a {
    padding: 0px;
    padding-right: 15px;
    margin: 0px;
    text-decoration: none;
    color: black;
  }
`;

const Icon = styled.img`
  max-width: 100%;
  height: auto;
`;

const Div = styled.div`
  float: left;
  width: 15px;
  height: 20px;
  margin-right: 4px;
`;

const ReactFlags = ({ type, value }) => (
  <>
    {value > 0 && (
      <ContainerDiv>
        <a href="/">
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
        </a>
      </ContainerDiv>
    )}
  </>
);

ReactFlags.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number,
};

ReactFlags.defaultProps = {
  value: 0,
};

export default ReactFlags;
