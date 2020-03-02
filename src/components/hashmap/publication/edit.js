import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArticleCardBox = styled.article`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  width: 100%;
  margin: 5% 0%;
`;

const LinkPreviewCard = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 2%;
  margin: 5% 0%;
`;

const InputTitle = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const InputDescription = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const Publication = ({ data }) => (
  <ArticleCardBox className="p-2">
    <header className="row justify-content-between">
      <div className="col-4">
        {data ? (
          <h6>{data.title}</h6>
        ) : (
          <InputTitle
            rows="1"
            type="text"
            id="title"
            name="title"
            placeholder="Título"
          />
        )}
      </div>
    </header>
    <hr />
    {data ? (
      <p>{data.description}</p>
    ) : (
      <InputDescription
        rows="10"
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
      />
    )}
    {data && (
      <LinkPreviewCard>
        <a target="_blank" rel="noopener noreferrer" href={data.link}>
          Link com Pré-Visualização
        </a>
      </LinkPreviewCard>
    )}
  </ArticleCardBox>
);

Publication.propTypes = {
  data: PropTypes.shape(),
};

Publication.defaultProps = {
  data: undefined,
};

export default Publication;
