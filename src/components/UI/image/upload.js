import React from 'react';
import shortid from 'shortid';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { loadFirebaseStorage, loadFirebaseApp } from 'app/lib/db';
import PropTypes from 'prop-types';
import { getUrlImage } from '../lib/getUrlImage';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const storage = loadFirebaseStorage();
const firebase = loadFirebaseApp();

const ImageUpload = ({
  onRequestSave,
  onRequestClear,
  defaultFiles,
  storageName,
}) => {
  const [files, setFiles] = React.useState(defaultFiles);
  const server = {
    // this uploads the image using firebase
    process: (fieldName, file, metadata, load, error, progress) => {
      // create a unique id for the file
      const id = shortid.generate();

      // upload the image to firebase
      const path = `${storageName}/${id}`;
      const task = storage.child(path).put(file);

      // monitor the task to provide updates to FilePond
      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snap => {
          // provide progress updates
          progress(true, snap.bytesTransferred, snap.totalBytes);
        },
        err => {
          // provide errors
          error(err.message);
        },
        () => {
          // the file has been uploaded
          load(id);
          getUrlImage(path).then(url => onRequestSave(path, url));
        }
      );
    },

    // this loads an already uploaded image to firebase
    load: (source, load, error, progress, abort) => {
      // reset our progress
      progress(true, 0, 1024);
      // fetch the download URL from firebase
      storage
        .child(source)
        .getDownloadURL()
        .then(url => {
          // console.log(url);
          // fetch the actual image using the download URL
          // and provide the blob to FilePond using the load callback
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            const blob = xhr.response;
            load(blob);
          };
          xhr.open('GET', url);
          xhr.send();
        })
        .catch(err => {
          error(err.message);
          abort();
        });
    },
  };

  return (
    <FilePond
      files={files}
      allowMultiple={false}
      // maxFiles={1}
      onupdatefiles={fileItems => {
        if (fileItems.length === 0) {
          onRequestClear();
        }
        setFiles(fileItems.map(fileItem => fileItem.file));
      }}
      server={server}
      labelIdle="Selecione uma Imagem"
    />
  );
};

ImageUpload.propTypes = {
  onRequestSave: PropTypes.func.isRequired,
  onRequestClear: PropTypes.func.isRequired,
  // defaultFiles: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     source: PropTypes.string.isRequired,
  //     options: {
  //       type: PropTypes.string.isRequired,
  //     },
  //   })
  // ),
  storageName: PropTypes.string,
};

ImageUpload.defaultProps = {
  // defaultFiles: [],
  storageName: 'imagens',
};

export default ImageUpload;
