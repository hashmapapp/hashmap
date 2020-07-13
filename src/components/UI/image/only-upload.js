import shortid from 'shortid';
import { loadFirebaseStorage, loadFirebaseApp } from 'app/lib/db';
import { getUrlImage } from '../lib/getUrlImage';

const storage = loadFirebaseStorage();
const firebase = loadFirebaseApp();

export const fireBaseUpload = (
  imageAsFile,
  storageName,
  onRequestSaveSuccess
) => {
  console.log('start of upload');
  if (imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    return;
  }
  const id = shortid.generate();
  const path = `${storageName}/${id}`;
  const task = storage.child(path).put(imageAsFile);

  task.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapShot => {
      // console.log(snapShot);
    },
    err => {
      console.error(err);
    },
    () => {
      getUrlImage(path).then(url => onRequestSaveSuccess(path, url));
    }
  );
};
