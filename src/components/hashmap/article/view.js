import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import PropTypes from 'prop-types';

const article = ({ data }) => (
  <>
    <article className="bg-gray-300">
      <div className="container mx-auto py-4">
        <div className="px-4 md:px-24 flex justify-center">
          <img
            className="shadow"
            src={data.urlImage}
            alt={data.textImage}
            style={{ maxHeight: '32rem' }}
          />
          {data.textImage && (
            <p className="font-sans my-3 text-center text-gray-600">
              {data.textImage}
            </p>
          )}
        </div>
        {data.description && (
          <p className="font-sans text-base md:text-lg text-gray-800 py-8 px-4 md:px-64">
            {data.description}
          </p>
        )}
      </div>
    </article>
    <article className="bg-gray-100">
      <div className="container mx-auto px-4 md:px-64 py-8">
        {data.posts.map(post => (
          <PublicationView key={post.key} data={post} />
        ))}
      </div>
    </article>
  </>
);

article.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default article;
