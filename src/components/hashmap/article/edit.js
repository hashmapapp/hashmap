import React from 'react';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputDescription = styled.textarea`
  width: 100%;
  /* padding: 12px 20px; */
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const article = ({ data }) => (
  <article>
    {data ? (
      <>
        <p>{data.description}</p>
        {data.posts.map(post => (
          <PublicationEdit key={post.id} data={post} />
        ))}
      </>
    ) : (
      <>
        <InputDescription
          rows="3"
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
        />
        <PublicationEdit />
      </>
    )}
    <NewPublicationButton />
  </article>
);

article.propTypes = {
  data: PropTypes.shape(),
};

article.defaultProps = {
  data: undefined,
};

export default article;
