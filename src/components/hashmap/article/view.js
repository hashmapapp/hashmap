import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import PropTypes from 'prop-types';

const article = ({ data }) => (
  <article>
    <p>{data.description}</p>
    {data.posts.map(post => (
      <PublicationView key={post.id} data={post} />
    ))}
    <NewPublicationButton />
  </article>
);

article.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default article;
