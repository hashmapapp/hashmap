import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import styled from 'styled-components';
import {
  postCreate,
  descriptionUpdate,
  imgHashmapUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';

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

const article = ({
  posts,
  descriptionUpdate,
  description,
  postCreate,
  imgHashmapUpdate,
  // image,
}) => {
  const handlerNewPost = evt => {
    evt.preventDefault();
    postCreate();
  };
  return (
    <article>
      <ImageUpload
        onRequestSave={(path, url) => {
          imgHashmapUpdate(path, url);
        }}
        onRequestClear={() => console.log('Clear')}
        storageName="hashmaps"
        // defaultFiles={[
        //   {
        //     source: 'hashmaps/f0xudwabp',
        //     options: {
        //       type: 'local',
        //     },
        //   },
        // ]}
      />
      <DescriptionTextArea
        rows="5"
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        onChange={e => {
          descriptionUpdate(e.target.value);
        }}
        value={description}
      />
      {posts.map((post, index) => {
        if (!post.key.startsWith('DELETE')) {
          return (
            <PublicationEdit
              data={post}
              index={index}
              key={post.key}
              fakeKey={post.key}
            />
          );
        }
      })}
      <NewPublicationButton onAction={handlerNewPost} />
    </article>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { postCreate, descriptionUpdate, imgHashmapUpdate },
    dispatch
  );

const mapStateToProps = state => ({
  description: state.hashmap.description,
  image: state.hashmap.image,
  posts: state.hashmap.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(article);
