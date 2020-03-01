import React from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import ReactFlags from './react-flag';

const ArticleCardBox = styled.article`
  /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05); */
  transition: 0.3s;
  width: 100%;
  /* padding: 2%; */
  margin: 5% 0%;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  }
`;

const LinkPreviewCard = styled.div`
  /* box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05); */
  border: solid 1px rgba(0, 0, 0, 0.05);
  padding: 2%;
  margin: 5% 0%;
`;

const Publication = () => (
  <ArticleCardBox className="p-2">
    <header className="row justify-content-between">
      <div className="col-4">
        <h6>Título</h6>
      </div>
      <div className="col-4 text-right">
        <FiMoreHorizontal />
      </div>
    </header>
    <hr />
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industrys standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
    <LinkPreviewCard>
      <p>Link com Pré-Visualização</p>
    </LinkPreviewCard>
    <hr />
    <footer className="row m-1">
      <ReactFlags className="col" value={1} type="like" />
      <ReactFlags className="col" value={112} type="heart" />
      <ReactFlags className="col" value={32} type="unlike" />
      <ReactFlags className="col" value={4} type="smiley" />
      <ReactFlags className="col" value={94} type="dissatisfied" />
      <ReactFlags className="col" value={11} type="rocket" />
      {/* <ReactFlags className="col" value={51} type="like" /> */}
      {/* <ReactFlags className="col" value={19} type="like" /> */}
    </footer>
  </ArticleCardBox>
);

export default Publication;
