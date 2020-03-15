import React from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ReactCount from 'app/components/hashmap/publication/components/react-count';
import WrapImage from 'app/components/UI/image/wrapper';
import LinkPreview from 'app/components/UI/link-preview/link-preview';

const ArticleCardBox = styled.article`
  transition: 0.3s;
  width: 100%;
  margin: 5% 0%;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  }
`;

const Publication = ({ data }) => (
  <ArticleCardBox>
    <div className="p-2">
      <div className="container">
        <header className="row justify-content-between">
          <div className="col-11">
            <h6>{data.title}</h6>
          </div>
          <div className="col-1 text-right">
            <FiMoreHorizontal />
          </div>
        </header>
      </div>
      <hr />
      <p>{data.description}</p>
    </div>
    {/* <WrapImage
      src="https://abrilexame.files.wordpress.com/2017/10/maskarad.jpg"
      alt="Imagem"
    /> */}
    <LinkPreview />
    <footer className="row m-1">
      <ReactCount className="col" value={data.react.like} type="like" />
      <ReactCount className="col" value={data.react.heart} type="heart" />
      <ReactCount className="col" value={data.react.unlike} type="unlike" />
      <ReactCount className="col" value={data.react.smiley} type="smiley" />
      <ReactCount
        className="col"
        value={data.react.dissatisfied}
        type="dissatisfied"
      />
      <ReactCount className="col" value={data.react.rocket} type="rocket" />
      <ReactCount className="col" value={data.react.hooray} type="hooray" />
      <ReactCount className="col" value={data.react.eyes} type="eyes" />
    </footer>
  </ArticleCardBox>
);

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
