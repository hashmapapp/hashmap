import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import PropTypes from 'prop-types';

const article = ({ data }) => (
  <article>
    <div className="my-4">
      <img
        className="shadow w-full object-cover "
        src={data.urlImage}
        alt={data.textImage}
      />
      {data.textImage && (
        <p className="font-sans my-3 text-center text-gray-600">
          {data.textImage}
        </p>
      )}
    </div>
    <p className="font-sans text-lg text-gray-800 pb-6">{data.description}</p>
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="col-span-1">
        <hr />
      </div>
      <div className="col-span-1 text-center">{/* <p>Posts</p> */}</div>
      <div className="col-span-1">
        <hr />
      </div>
    </div>
    <div className="pt-8">
      {data.posts.map(post => (
        <PublicationView key={post.key} data={post} />
      ))}
    </div>
    {/* <NewPublicationButton /> */}
  </article>
);

article.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default article;
