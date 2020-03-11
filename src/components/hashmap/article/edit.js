import React from 'react';
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
`;

const article = ({ posts, descriptionUpdate, description, postCreate }) => {
  const handlerNewPost = evt => {
    evt.preventDefault();
    postCreate();
  };
  return (
    <article>
      <DescriptionTextArea
        rows="3"
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        onChange={e => {
          descriptionUpdate(e.target.value);
        }}
        value={description}
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
