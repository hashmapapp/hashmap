import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import {
  postCreate,
  descriptionUpdate,
  imgHashmapUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';

const article = ({
  posts,
  description,
  handlerDescription,
  handlerCrete,
  handlerImage,
  // imagePath,
}) => {
  const handlerNewPost = evt => {
    evt.preventDefault();
    handlerCrete();
  };
  return (
    <article className="container mx-auto px-4 md:px-64 md:py-8">
      <ImageUpload
        onRequestSave={(path, url) => {
          handlerImage(path, url);
        }}
        onRequestClear={() => console.log('Clear')}
        storageName="hashmaps"
        // defaultFiles={[
        //   {
        //     source: imagePath,
        //     options: {
        //       type: 'local',
        //     },
        //   },
        // ]}
      />
      <TextArea
        className="Text"
        rows="5"
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        onChange={e => {
          handlerDescription(e.target.value);
        }}
        value={description}
      />
      {posts
        .filter(post => !post.key.startsWith('DELETE'))
        .map(post => (
          <PublicationEdit data={post} key={post.key} temporaryKey={post.key} />
        ))}
      <NewPublicationButton onAction={handlerNewPost} />
    </article>
  );
};

article.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  handlerDescription: PropTypes.func.isRequired,
  handlerCrete: PropTypes.func.isRequired,
  handlerImage: PropTypes.func.isRequired,
  description: PropTypes.string,
};

article.defaultProps = {
  description: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerCrete: postCreate,
      handlerDescription: descriptionUpdate,
      handlerImage: imgHashmapUpdate,
    },
    dispatch
  );

const mapStateToProps = state => ({
  description: state.hashmap.description,
  image: state.hashmap.image,
  posts: state.hashmap.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(article);
