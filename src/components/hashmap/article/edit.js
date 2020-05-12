import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicationEdit from 'app/components/hashmap/publication/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import ButtonBar from 'app/components/hashmap/publication/components/button-bar';
import {
  postCreate,
  descriptionUpdate,
  imgHashmapUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';
import UIModal from 'app/components/UI/modal/modal';

const article = ({
  posts,
  description,
  handlerDescription,
  handlerCrete,
  handlerImage,
  imagePath,
}) => {
  const handlerNewPost = evt => {
    evt.preventDefault();
    handlerCrete();
  };
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [loadImage, setLoadImage] = useState(false);
  useEffect(() => {
    if (imagePath && imagePath !== '') {
      setDefaultFiles([
        {
          source: imagePath,
          options: {
            type: 'local',
          },
        },
      ]);
      setLoadImage(true);
    }
  }, [imagePath]);
  return (
    <>
      <article className="container mx-auto px-4 md:px-64 md:py-8">
        <h6 className="px-2 font-sans text-lg text-gray-500">Capa</h6>
        {!loadImage && (
          <ImageUpload
            onRequestSave={(path, url) => {
              handlerImage(path, url);
            }}
            onRequestClear={() => {
              handlerImage('', '');
              console.log('Clear');
              setDefaultFiles([]);
            }}
            storageName="hashmaps"
          />
        )}
        {loadImage && (
          <ImageUpload
            onRequestSave={(path, url) => {
              handlerImage(path, url);
            }}
            onRequestClear={() => {
              handlerImage('', '');
              console.log('Clear');
              setDefaultFiles([]);
            }}
            storageName="hashmaps"
            defaultFiles={defaultFiles}
          />
        )}
        <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">
          Descrição (Opcional)
        </h6>
        <TextArea
          className="Text"
          rows="5"
          type="text"
          id="description"
          name="description"
          placeholder="Aqui você pode descrever com mais detalhes sobre o que é o
        seu hashmap, falando por exemplo, o motivo da criação dele."
          onChange={e => {
            handlerDescription(e.target.value);
          }}
          value={description}
          maxLength="500"
        />
        {posts
          .filter(post => !post.key.startsWith('DELETE'))
          .map((post, index) => (
            <div key={post.key} className="mt-4">
              <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">{`#${index +
                1}`}</h6>
              <PublicationEdit
                data={post}
                temporaryKey={post.key}
                index={index}
              />
            </div>
          ))}
        <NewPublicationButton onAction={handlerNewPost} />
      </article>
      {/* <UIModal /> */}
      {/* <ButtonBar /> */}
    </>
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
  imagePath: state.hashmap.imagePath,
  posts: state.hashmap.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(article);
