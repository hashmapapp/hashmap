import React from 'react';
import PropTypes from 'prop-types';
import ReactCount from 'app/components/hashmap/publication/components/react-count';
// import WrapImage from 'app/components/UI/image/wrapper';
// import LinkPreview from 'app/components/UI/link-preview/link-preview';
// import AddReact from './components/add-react';

const Publication = ({ data }) => (
  <article className="my-3 max-w-xg rounded overflow-hidden shadow">
    {data.imageUrl && (
      <img className="w-full" src={data.imageUrl} alt={data.title} />
    )}
    <div className="px-6 py-4">
      <div className="font-sans font-bold text-xl mb-2">{data.title}</div>
      <p className="font-sans text-lg text-gray-700">{data.description}</p>
    </div>
    <div className="px-6 pt-4 pb-2 grid grid-cols-9">
      {data.react.like > 0 && (
        <ReactCount value={data.react.like} type="like" />
      )}
      {data.react.heart > 0 && (
        <ReactCount value={data.react.heart} type="heart" />
      )}
      {data.react.unlike > 0 && (
        <ReactCount value={data.react.unlike} type="unlike" />
      )}
      {data.react.smiley > 0 && (
        <ReactCount value={data.react.smiley} type="smiley" />
      )}
      {data.react.dissatisfied > 0 && (
        <ReactCount value={data.react.dissatisfied} type="dissatisfied" />
      )}
      {data.react.rocket > 0 && (
        <ReactCount value={data.react.rocket} type="rocket" />
      )}
      {data.react.hooray > 0 && (
        <ReactCount value={data.react.hooray} type="hooray" />
      )}
      {data.react.eyes > 0 && (
        <ReactCount value={data.react.eyes} type="eyes" />
      )}
      {/* <AddReact /> */}
    </div>
  </article>
);

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
