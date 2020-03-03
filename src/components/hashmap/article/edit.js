import React, { useState } from 'react';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DescriptionTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const article = ({ data }) => {
  const [description, setDescription] = useState();
  return (
    <article>
      <DescriptionTextArea
        rows="3"
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        onChange={e => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <PublicationEdit />
      <NewPublicationButton />
    </article>
  );
};

article.propTypes = {
  data: PropTypes.shape(),
};

article.defaultProps = {
  data: undefined,
};

export default article;
