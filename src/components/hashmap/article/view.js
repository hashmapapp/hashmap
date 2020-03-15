import React from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import PropTypes from 'prop-types';
import WrapImage from 'app/components/UI/image/wrapper';

const article = ({ data }) => (
  <article>
    <WrapImage
      src="https://miro.medium.com/max/6480/1*PU20rbKCMm3C2BLEM24dgg.jpeg"
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
