import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import PropTypes from 'prop-types';
import WrapImage from 'app/components/UI/image/wrapper';

const article = ({ data }) => (
  <article>
    <WrapImage
      src={data.urlImage}
      alt="Livros"
      description="Photo by John Schnobrich on Unsplash"
    />
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
