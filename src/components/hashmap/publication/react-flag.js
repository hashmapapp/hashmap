import React from 'react';
import styled from 'styled-components';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TiHeartFullOutline } from 'react-icons/ti';
import {
  MdSentimentDissatisfied,
  MdSentimentVerySatisfied,
} from 'react-icons/md';
import { IoIosRocket } from 'react-icons/io';
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

const ReactFlags = ({ type, value }) => (
  <>
    {value > 0 && (
      <ContainerDiv>
        <a href="/">
          {type === 'like' && <AiFillLike />}
          {type === 'heart' && <TiHeartFullOutline />}
          {type === 'unlike' && <AiFillDislike />}
          {type === 'smiley' && <MdSentimentVerySatisfied />}
          {type === 'dissatisfied' && <MdSentimentDissatisfied />}
          {type === 'rocket' && <IoIosRocket />}
          {/* {type === 'heart' && <TiHeartFullOutline />} */}
          {/* {type === 'heart' && <TiHeartFullOutline />} */} {value}
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
