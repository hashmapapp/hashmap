import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Iframe from 'react-iframe';
import InstagramEmbed from 'react-instagram-embed';
import {
  titlePostUpdate,
  postDelete,
  dataPostUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';
import { MdRemoveCircle, MdTextFields } from 'react-icons/md';
import { IoMdLink } from 'react-icons/io';
import { FaImage } from 'react-icons/fa';
import LinkPreview from 'app/components/UI/link-preview/link-preview';
import InstagramProfilePreview from 'app/components/UI/link-preview/instagram-profile-preview';
import styled from 'styled-components';
import { loadLink } from './lib/loadLink';

const AnimationLoader = styled.div`
  -webkit-animation: ${prop => prop.play && 'spin 1s linear infinite'};
  animation: ${prop => prop.play && 'spin 1s linear infinite'};
`;

const Publication = ({
  data,
  temporaryKey,
  handlerTitle,
  handlerDelete,
  handlerData,
  index,
}) => {
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showTextDescription, setShowTextDescription] = useState(false);
  const [loaderLink, setLoaderLink] = useState(false);
  const [link, setLink] = useState('');
  const [loadLinkError, setLoadLinkError] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);

  const clearLinkPreviews = () => {
    handlerData([], 'linksToPreview', temporaryKey);
    handlerData({}, 'videoYT', temporaryKey);
    handlerData({}, 'instragramPostPreview', temporaryKey);
    handlerData({}, 'instragramProfilePreview', temporaryKey);
  };

  const clearInputLink = () => {
    setLink('');
    setShowLink(!showLink);
  };

  const handlerLink = evt => {
    let { value } = evt.target;
    value = value.split(' ').join('');
    setLink(value);
    setLoaderLink(true);
    setLoadLinkError(false);
    clearLinkPreviews();
    loadLink(value)
      .then(loadData => {
        if (loadData && loadData.type) {
          handlerData(loadData.preview, loadData.type, temporaryKey);
          setLoaderLink(false);
        } else {
          setLoaderLink(false);
          setLoadLinkError(true);
        }
      })
      .catch(error => {
        setLoaderLink(false);
        setLoadLinkError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    if (data.linksToPreview && data.linksToPreview.length) {
      const url = data.linksToPreview.map(item => item.url).join(' ');
      setLink(url);
      setShowLink(true);
    } else if (data.videoYT && data.videoYT.value) {
      const url = data.videoYT.value;
      setLink(url);
      setShowLink(true);
    } else if (data.instragramPostPreview && data.instragramPostPreview.value) {
      const url = data.instragramPostPreview.value;
      setLink(url);
      setShowLink(true);
    } else if (
      data.instragramProfilePreview &&
      data.instragramProfilePreview.value
    ) {
      const url = data.instragramProfilePreview.value;
      setLink(url);
      setShowLink(true);
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

  useEffect(() => {
    handlerData(index, 'index', temporaryKey);
  }, [index]);

  return (
    <>
      <div className="p-2 mb-4 shadow">
        <header className="grid grid-cols-6 gap-4 flex">
          <div className="col-span-5 md:col-span-5 flex-shrink h-12">
            <TextArea
              className="Text"
              rows="1"
              type="text"
              id="title"
              name="title"
              placeholder="Título"
              onChange={e => {
                handlerTitle(e.target.value, temporaryKey);
              }}
              value={data.title}
              maxLength="50"
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
                handlerData(path, 'imagePath', temporaryKey);
                handlerData(url, 'imageUrl', temporaryKey);
              }}
              onRequestClear={() => {
                setDefaultFiles([]);
                handlerData('', 'imagePath', temporaryKey);
                handlerData('', 'imageUrl', temporaryKey);
              }}
              storageName="posts"
              defaultFiles={defaultFiles}
            />
          </div>
        )}

        {data.instragramPostPreview && data.instragramPostPreview.value && (
          <div className="my-4 flex justify-center">
            <InstagramEmbed
              url={data.instragramPostPreview.value}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              // onLoading={() => {}}
              // onSuccess={() => {}}
              // onAfterRender={() => {}}
              // onFailure={() => {}}
            />
          </div>
        )}

        {data.instragramProfilePreview &&
          data.instragramProfilePreview.value && (
            <InstagramProfilePreview data={data.instragramProfilePreview} />
          )}

        {showTextDescription && (
          <TextArea
            className="Text"
            rows="5"
            type="text"
            id="description"
            name="description"
            placeholder="Descrição"
            onChange={e => {
              handlerData(e.target.value, 'textDescription', temporaryKey);
            }}
            value={data.textDescription || ''}
            maxLength="500"
          />
        )}
        {showLink && (
          <input
            className={`appearance-none block w-full text-gray-700 
            border ${loadLinkError &&
              'border-red-500'} rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white`}
            id="link"
            type="text"
            placeholder="https://seulink.com"
            value={link || ''}
            onChange={handlerLink}
          />
        )}
        {data.linksToPreview &&
          data.linksToPreview.map(linkPreview => (
            <LinkPreview key={linkPreview.url} data={linkPreview} />
          ))}

        {data.videoYT && data.videoYT.embed && (
          <div className="my-4">
            <Iframe
              frameborder="0"
              allowfullscreen
              url={data.videoYT.embed}
              width="100%"
              className="h-56 sm:h-64"
              id="myId"
              display="initial"
              position="relative"
            />
          </div>
        )}

        <div className="text-right mt-4">
          <div className="inline-flex">
            <button
              type="button"
              className={`${showUploadImage &&
                'bg-gray-300'} hover:bg-gray-400 py-2 px-4 rounded-l`}
              onClick={() => {
                setDefaultFiles([]);
                handlerData('', 'imagePath', temporaryKey);
                handlerData('', 'imageUrl', temporaryKey);
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
                clearLinkPreviews();
                clearInputLink();
              }}
            >
              <AnimationLoader play={loaderLink}>
                <IoMdLink />
              </AnimationLoader>
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
      handlerData: dataPostUpdate,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Publication);
