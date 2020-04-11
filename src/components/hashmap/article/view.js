import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import PropTypes from 'prop-types';

const article = ({ data }) => (
  <>
    <article style={{ backgroundColor: '#fafafa' }}>
      <div className="container mx-auto py-4">
        <div className="px-4 md:px-24">
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
        <p className="font-sans text-base md:text-lg text-gray-800 py-8 px-4 md:px-64">
          {data.description}
        </p>
      </div>
    </article>
    <article>
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
