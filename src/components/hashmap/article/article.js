import React from 'react';
import Publication from 'app/components/hashmap/publication/publication';
import NewPublication from 'app/components/hashmap/publication/new';
import PropTypes from 'prop-types';

const article = ({ data }) => (
  <article>
    <p>{data.description}</p>
    {data.posts.map(post => (
      <Publication key={post.id} data={post} />
    ))}
    <NewPublication />
  </article>
);

article.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default article;
