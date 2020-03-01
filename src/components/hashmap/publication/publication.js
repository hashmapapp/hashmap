import React from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ReactFlags from './react-flag';

const ArticleCardBox = styled.article`
  /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05); */
  transition: 0.3s;
  width: 100%;
  /* padding: 2%; */
  margin: 5% 0%;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  }
`;

const LinkPreviewCard = styled.div`
  /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05); */
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 2%;
  margin: 5% 0%;
`;

const Publication = ({ data }) => (
  <ArticleCardBox className="p-2">
    <header className="row justify-content-between">
      <div className="col-4">
        <h6>{data.title}</h6>
      </div>
      <div className="col-4 text-right">
        <FiMoreHorizontal />
      </div>
    </header>
    <hr />
    <p>{data.description}</p>
    <LinkPreviewCard>
      <a target="_blank" rel="noopener noreferrer" href={data.link}>
        Link com Pré-Visualização
      </a>
    </LinkPreviewCard>
    {/* <hr /> */}
    <footer className="row m-1">
      <ReactFlags className="col" value={data.react.like} type="like" />
      <ReactFlags className="col" value={data.react.heart} type="heart" />
      <ReactFlags className="col" value={data.react.unlike} type="unlike" />
      <ReactFlags className="col" value={data.react.smiley} type="smiley" />
      <ReactFlags
        className="col"
        value={data.react.dissatisfied}
        type="dissatisfied"
      />
      <ReactFlags className="col" value={data.react.rocket} type="rocket" />
      <ReactFlags className="col" value={data.react.hooray} type="hooray" />
      <ReactFlags className="col" value={data.react.eyes} type="eyes" />
    </footer>
  </ArticleCardBox>
);

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
