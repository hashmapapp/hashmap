import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Iframe from 'react-iframe';
import {
  titlePostUpdate,
  postDelete,
  imgPostUpdate,
  dataPostUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';
import { MdRemoveCircle, MdTextFields } from 'react-icons/md';
import { IoMdLink } from 'react-icons/io';
import { FaImage, FaYoutube } from 'react-icons/fa';
import LinkPreview from 'app/components/UI/link-preview/link-preview';
import styled from 'styled-components';

const AnimationLoader = styled.div`
  -webkit-animation: ${prop => prop.play && 'spin 1s linear infinite'};
  animation: ${prop => prop.play && 'spin 1s linear infinite'};
`;

const Publication = ({
  data,
  temporaryKey,
  handlerTitle,
  handlerDelete,
  handlerImage,
  handlerData,
}) => {
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showVideoYT, setShowVideoYT] = useState(false);
  const [showTextDescription, setShowTextDescription] = useState(false);
  const [loaderLink, setLoaderLink] = useState(false);
  const [link, setLink] = useState('');
  const [videoYT, setVideoYT] = useState();
  const [urlYT, setUrlYT] = useState('');
  const [defaultFiles, setDefaultFiles] = useState([]);

  const handlerLink = evt => {
    const { value } = evt.target;
    setLink(value);
    if (value.includes('http://') || value.includes('https://')) {
      setLoaderLink(true);
      axios
        .post('https://us-central1-hashmap-6d623.cloudfunctions.net/scraper', {
          text: value,
        })
        .then(response => {
          handlerData(response.data, 'linksToPreview', temporaryKey);
          setLoaderLink(false);
        })
        .catch(error => {
          console.log(error);
          setLoaderLink(false);
        });
    } else if (value === '') handlerData([], 'linksToPreview', temporaryKey);
  };

  const handlerVideoYT = evt => {
    const { value } = evt.target;
    setUrlYT(value);
    if (value.includes('youtube') && value.includes('watch')) {
      let videoId = value.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      const embed = `https://www.youtube.com/embed/${videoId}`;
      handlerData({ value, embed }, 'videoYT', temporaryKey);
    } else {
      setVideoYT();
    }
  };

  useEffect(() => {
    if (data.linksToPreview && data.linksToPreview.length) {
      const url = data.linksToPreview.map(item => item.url).join(' ');
      setLink(url);
      setShowLink(true);
    }
    if (data.videoYT) {
      setUrlYT(data.videoYT.value);
      setVideoYT(data.videoYT.embed);
      setShowVideoYT(true);
    }
    if (data.textDescription) {
      setShowTextDescription(true);
    }
    if (data.imagePath && data.imagePath !== '') {
      setDefaultFiles([
        {
          source: data.imagePath,
          options: {
            type: 'local',
          },
        },
      ]);
      setShowUploadImage(true);
    }
  }, []);

  return (
    <>
      <div className="p-2 my-4 shadow">
        <header className="grid grid-cols-6 gap-4 flex">
          <div className="col-span-5 md:col-span-5 flex-shrink h-12">
            <TextArea
              className="Text"
              rows="1"
              type="text"
              id="title"
              name="title"
              placeholder="Nome da Seção"
              onChange={e => {
                handlerTitle(e.target.value, temporaryKey);
              }}
              value={data.title}
            />
          </div>
          <div className="col-span-1 md:col-span-1 text-right flex-shrink">
            <button
              type="button"
              className="hover:bg-red-300 py-2 px-4 rounded"
              onClick={() => {
                handlerDelete(temporaryKey);
              }}
            >
              <MdRemoveCircle />
            </button>
          </div>
        </header>
        {showUploadImage && (
          <div className="pt-4">
            <ImageUpload
              onRequestSave={(path, url) => {
                handlerImage(path, url, temporaryKey);
              }}
              onRequestClear={() => {
                setDefaultFiles([]);
                handlerImage('', '', temporaryKey);
              }}
              storageName="posts"
              defaultFiles={defaultFiles}
            />
          </div>
        )}
        {showTextDescription && (
          <TextArea
            className="Text"
            rows="10"
            type="text"
            id="description"
            name="description"
            placeholder="Descrição"
            onChange={e => {
              handlerData(e.target.value, 'textDescription', temporaryKey);
            }}
            value={data.textDescription || ''}
          />
        )}
        {showLink && (
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 
          border rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white"
            id="link"
            type="text"
            placeholder="https://seulink.com"
            value={link}
            onChange={handlerLink}
          />
        )}
        {data.linksToPreview &&
          data.linksToPreview.map(linkPreview => (
            <LinkPreview key={linkPreview.url} data={linkPreview} />
          ))}

        {showVideoYT && (
          <div className="my-4">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 
        border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="urlYt"
              type="text"
              placeholder="Cole o link aqui"
              value={urlYT}
              onChange={handlerVideoYT}
            />
            {videoYT && (
              <Iframe
                frameborder="0"
                allowfullscreen
                url={videoYT}
                width="100%"
                className="h-56 sm:h-64"
                id="myId"
                display="initial"
                position="relative"
              />
            )}
          </div>
        )}
        <div className="text-right mt-4">
          <div className="inline-flex">
            <button
              type="button"
              className={`${showUploadImage &&
                'bg-gray-300'} hover:bg-gray-400 py-2 px-4 rounded-l`}
              onClick={() => {
                setShowUploadImage(!showUploadImage);
              }}
            >
              <FaImage />
            </button>
            <button
              type="button"
              className={`${showTextDescription &&
                'bg-gray-300'} hover:bg-gray-400 py-2 px-4`}
              onClick={() => {
                handlerData('', 'textDescription', temporaryKey);
                setShowTextDescription(!showTextDescription);
              }}
            >
              <MdTextFields />
            </button>
            <button
              type="button"
              className={`${showLink &&
                'bg-gray-300'} hover:bg-gray-400 py-2 px-4`}
              onClick={() => {
                handlerData([], 'linksToPreview', temporaryKey);
                setLink('');
                setShowLink(!showLink);
              }}
            >
              <AnimationLoader play={loaderLink}>
                <IoMdLink />
              </AnimationLoader>
            </button>
            <button
              type="button"
              className={`${showVideoYT &&
                'bg-gray-300'} hover:bg-gray-400 py-2 px-4 rounded-r`}
              onClick={() => {
                setUrlYT('');
                handlerData({}, 'videoYT', temporaryKey);
                setShowVideoYT(!showVideoYT);
              }}
            >
              <FaYoutube />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Publication.propTypes = {
  data: PropTypes.shape(),
  temporaryKey: PropTypes.string.isRequired,
  handlerTitle: PropTypes.func.isRequired,
  handlerDelete: PropTypes.func.isRequired,
  handlerImage: PropTypes.func.isRequired,
  handlerData: PropTypes.func.isRequired,
};

Publication.defaultProps = {
  data: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerTitle: titlePostUpdate,
      handlerDelete: postDelete,
      handlerImage: imgPostUpdate,
      handlerData: dataPostUpdate,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Publication);
