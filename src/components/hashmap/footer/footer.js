import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Avatar } from '../publication/components/style';

const Author = styled.h6``;

const Bio = styled.p``;

const Span = styled.span`
  color: #444;
`;

const footer = ({ data }) => (
  <>
    <hr />
    <footer className="p-2">
      <div className="row">
        <div className="col col-lg-2 text-right">
          <Avatar src="imgs/avatar/pp.jpg" alt="avatar" />
        </div>
        <div className="col-md-auto text-left">
          <Span>Criado Por</Span>
          <Author>{data.name}</Author>
          <Bio>{data.bio}</Bio>
        </div>
      </div>
    </footer>
    <hr />
  </>
);

footer.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default footer;
