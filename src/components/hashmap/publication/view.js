import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactCount from 'app/components/hashmap/publication/components/react-count';
import WrapImage from 'app/components/UI/image/wrapper';
// import LinkPreview from 'app/components/UI/link-preview/link-preview';
import AddReact from './components/add-react';

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
      <header className="row justify-content-between">
        <div className="col-11">
          <h6>{data.title}</h6>
        </div>
        <div className="col-1 text-right">{/* <FiMoreHorizontal /> */}</div>
      </header>
      <hr />
      <p>{data.description}</p>
    </div>
    {data.imageUrl && <WrapImage src={data.imageUrl} alt={data.title} />}
    {/* <LinkPreview data={data.link} /> */}
    <div className="p-2">
      <footer className="row m-1">
        {data.react.like > 0 && (
          <ReactCount className="col" value={data.react.like} type="like" />
        )}
        {data.react.heart > 0 && (
          <ReactCount className="col" value={data.react.heart} type="heart" />
        )}
        {data.react.unlike > 0 && (
          <ReactCount className="col" value={data.react.unlike} type="unlike" />
        )}
        {data.react.smiley > 0 && (
          <ReactCount className="col" value={data.react.smiley} type="smiley" />
        )}
        {data.react.dissatisfied > 0 && (
          <ReactCount
            className="col"
            value={data.react.dissatisfied}
            type="dissatisfied"
          />
        )}
        {data.react.rocket > 0 && (
          <ReactCount className="col" value={data.react.rocket} type="rocket" />
        )}
        {data.react.hooray > 0 && (
          <ReactCount className="col" value={data.react.hooray} type="hooray" />
        )}
        {data.react.eyes > 0 && (
          <ReactCount className="col" value={data.react.eyes} type="eyes" />
        )}
        <AddReact />
      </footer>
    </div>
  </ArticleCardBox>
);

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
