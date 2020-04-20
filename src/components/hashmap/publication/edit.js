import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
// import Iframe from 'react-iframe';
import {
  titlePostUpdate,
  subtitlePostUpdate,
  postDelete,
  imgPostUpdate,
} from 'app/redux/actions/hashmapActions';
import ImageUpload from 'app/components/UI/image/upload';
import { TextArea } from 'app/components/UI/styles/styles';
import { MdRemoveCircle } from 'react-icons/md';
import { IoMdLink } from 'react-icons/io';
import { FaImage } from 'react-icons/fa';
import LinkPreview from 'app/components/UI/link-preview/link-preview';

const Publication = ({
  data,
  temporaryKey,
  handlerTitle,
  handlerSubtitle,
  handlerDelete,
  handlerImage,
}) => {
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showLink, setShowLink] = useState(false);
  // const [showVideoYT, setShowVideoYT] = useState(false);
  const [link, setLink] = useState('');
  const [linksPreview, setLinksPreview] = useState();
  // const [videoYT, setVideoYT] = useState();

  const handlerLink = evt => {
    console.log(evt.target.value);
    const { value } = evt.target;
    setLink(value);
    if (value.includes('http://') || value.includes('https://')) {
      console.log('Buscando...');
      axios
        .post('https://us-central1-hashmap-6d623.cloudfunctions.net/scraper', {
          text: value,
        })
        .then(response => {
          // handle success
          // console.log(response.data);
          setLinksPreview(response.data);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    } else {
      console.log(value);
    }
  };

  return (
    <>
      <div className="p-2 m-4 shadow">
        <header className="grid grid-cols-6 gap-4 flex">
          <div className="col-span-4 md:col-span-5 flex-shrink h-12">
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
            />
          </div>
          <div className="col-span-2 md:col-span-1 text-right flex-shrink">
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
        <TextArea
          className="Text"
          rows="10"
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
          onChange={e => {
            handlerSubtitle(e.target.value, temporaryKey);
          }}
          value={data.description}
        />
        {/* <Iframe
          frameborder="0"
          allowfullscreen
          url="https://www.youtube.com/embed/H4tAOexHdR4"
          width="100%"
          className="h-56 sm:h-64"
          id="myId"
          display="initial"
          position="relative"
        /> */}
        {linksPreview &&
          linksPreview.map(linkPreview => (
            <LinkPreview key={linkPreview.url} data={linkPreview} />
          ))}
        {showUploadImage && (
          <ImageUpload
            onRequestSave={(path, url) => {
              handlerImage(path, url, temporaryKey);
            }}
            onRequestClear={() => console.log('Clear')}
            storageName="posts"
            // defaultFiles={[
            //   {
            //     source: 'hashmaps/f0xudwabp',
            //     options: {
            //       type: 'local',
            //     },
            //   },
            // ]}
          />
        )}
        {showLink && (
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 
          border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="link"
            type="text"
            placeholder="https://seulink.com"
            value={link}
            onChange={handlerLink}
          />
        )}
        <div className="text-right">
          <div className="inline-flex">
            {/* <button
              type="button"
              className="hover:bg-gray-300 py-2 px-4 rounded-l"
              onClick={() => setShowLink(!showLink)}
            >
              <FaYoutube />
            </button> */}
            <button
              type="button"
              className="hover:bg-gray-300 py-2 px-4 rounded-l"
              onClick={() => setShowLink(!showLink)}
            >
              <IoMdLink />
            </button>
            <button
              type="button"
              className="hover:bg-gray-300 py-2 px-4 rounded-r"
              onClick={() => setShowUploadImage(!showUploadImage)}
            >
              <FaImage />
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
  handlerSubtitle: PropTypes.func.isRequired,
  handlerDelete: PropTypes.func.isRequired,
  handlerImage: PropTypes.func.isRequired,
};

Publication.defaultProps = {
  data: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerTitle: titlePostUpdate,
      handlerSubtitle: subtitlePostUpdate,
      handlerDelete: postDelete,
      handlerImage: imgPostUpdate,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Publication);
