import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import styled from 'styled-components';
import {
  postCreate,
  descriptionUpdate,
} from 'app/redux/actions/hashmapActions';

const DescriptionTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
  font-family: 'Open Sans Regular', sans-serif;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const article = ({ posts, descriptionUpdate, description, postCreate }) => {
  const refContainer = useRef(null);
  const handlerNewPost = evt => {
    evt.preventDefault();
    postCreate();
  };
  const getNumberRows = value => {
    const numberCaracteres = value.length;
    const numberParagraphs = value.split('\n').length;
    return Math.ceil(numberCaracteres / 97) + numberParagraphs + 1;
  };
  const [rows, setRows] = useState(getNumberRows(description));
  console.log(rows);

  return (
    <article>
      <DescriptionTextArea
        rows={rows}
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        onChange={e => {
          descriptionUpdate(e.target.value);
          setRows(getNumberRows(e.target.value));
        }}
        value={description}
        ref={refContainer}
      />
      {posts.map((post, index) => (
        <PublicationEdit data={post} index={index} key={index} />
      ))}
      <NewPublicationButton onAction={handlerNewPost} />
    </article>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ postCreate, descriptionUpdate }, dispatch);

const mapStateToProps = state => ({
  description: state.hashmap.description,
  posts: state.hashmap.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(article);
