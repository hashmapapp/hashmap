import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  titleUpdate,
  subtitleUpdate,
  descriptionUpdate,
  imgHashmapUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';

const header = ({
  title,
  subtitle,
  handlerTitle,
  handlerSubtitle,
  description,
  handlerDescription,
  handlerImage,
  imagePath,
}) => {
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
      <header>
        <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">Título *</h6>
        <TextArea
          className="Title"
          rows="2"
          id="title"
          name="title"
          placeholder="Um título bem legal aqui!"
          onChange={evt => {
            handlerTitle(evt.target.value);
          }}
          value={title}
          maxLength="100"
        />
        <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">
          Subtítulo (Opcional)
        </h6>
        <TextArea
          className="Text"
          rows="2"
          type="text"
          id="subtitle"
          name="subtitle"
          placeholder="Aqui você pode colocar algo que complete o título, este texto aparecerá na sua home, junto com o título e a capa do seu hashmap."
          onChange={evt => {
            handlerSubtitle(evt.target.value);
          }}
          value={subtitle}
          maxLength="200"
        />
      </header>
      <article>
        <h6 className="px-2 font-sans text-lg text-gray-500">Capa *</h6>
        {!loadImage && (
          <ImageUpload
            onRequestSave={(path, url) => {
              handlerImage(path, url);
            }}
            onRequestClear={() => {
              handlerImage('', '');
              // console.log('Clear');
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
              // console.log('Clear');
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
      </article>
    </>
  );
};

header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  handlerTitle: PropTypes.func.isRequired,
  handlerSubtitle: PropTypes.func.isRequired,
};

header.defaultProps = {
  subtitle: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerTitle: titleUpdate,
      handlerSubtitle: subtitleUpdate,
      handlerDescription: descriptionUpdate,
      handlerImage: imgHashmapUpdate,
    },
    dispatch
  );

const mapStateToProps = state => ({
  title: state.hashmap.title,
  subtitle: state.hashmap.subtitle,
  description: state.hashmap.description,
  imagePath: state.hashmap.imagePath,
});

export default connect(mapStateToProps, mapDispatchToProps)(header);
