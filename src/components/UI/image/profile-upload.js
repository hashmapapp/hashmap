import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getUrlImage } from 'app/components/UI/lib/getUrlImage';
import { loadFirebaseStorage, loadFirebaseApp } from 'app/lib/db';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

const storage = loadFirebaseStorage();
const firebase = loadFirebaseApp();

const ProfileImageUpload = ({
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
      const task = storage.child(path).put(file, {
        contentType: 'image/jpeg',
      });
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
          console.log(url);
          // fetch the actual image using the download URL
          // and provide the blob to FilePond using the load callback
          // const xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.onload = () => {
          //   const blob = xhr.response;
          //   load(blob);
          // };
          // xhr.open('GET', url);
          // xhr.send();
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
      labelIdle="Selecionar Imagem"
      imagePreviewHeight="170"
      imageCropAspectRatio="1:1"
      imageResizeTargetWidth="200"
      imageResizeTargetHeight="200"
      stylePanelLayout="compact circle"
      styleLoadIndicatorPosition="center bottom"
      styleProgressIndicatorPosition="right bottom"
      styleButtonRemoveItemPosition="left bottom"
      styleButtonProcessItemPosition="right bottom"
    />
  );
};

ProfileImageUpload.propTypes = {
  onRequestSave: PropTypes.func.isRequired,
  onRequestClear: PropTypes.func.isRequired,
  defaultFiles: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      options: {
        type: PropTypes.string.isRequired,
      },
    })
  ),
  storageName: PropTypes.string,
};

ProfileImageUpload.defaultProps = {
  defaultFiles: [],
  storageName: 'imagens',
};

export default ProfileImageUpload;
