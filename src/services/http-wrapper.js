import { loadFirebaseStore } from 'app/lib/db';
import {
  HOME_HASHMAP_COLLECTION,
  HASHMAPS_COLLECTION,
} from 'app/screens/lib/constants';

export class HttpWrapperFirebase {
  constructor() {
    this.db = loadFirebaseStore();
  }

  createItem = (path, item) => {
    return this.db()
      .collection(path)
      .add(item);
  };

  setNewItem = (path, key, item) => {
    return this.db()
      .collection(path)
      .doc(key)
      .set(item);
  };

  createItems = (path, dataCreate = { items: [] }) => {
    const batch = this.db().batch();
    dataCreate.items.forEach(item => {
      const ref = this.db()
        .collection(path)
        .doc();
      batch.set(ref, item);
    });
    return batch.commit();
  };

  updateItem = (path, key, item) => {
    const ref = this.db()
      .collection(path)
      .doc(key);
    return ref.update(item);
  };

  deleteItem = (path, key) => {
    const ref = this.db()
      .collection(path)
      .doc(key);
    return ref.delete();
  };

  updateItems = (
    path,
    dataUpdate = { items: [], keys: [] },
    dataCreate = { items: [] },
    dataDelete = { keys: [] }
  ) => {
    const batch = this.db().batch();
    dataUpdate.items.forEach((item, index) => {
      const ref = this.db()
        .collection(path)
        .doc(dataUpdate.keys[index]);
      batch.update(ref, item);
    });
    dataCreate.items.forEach(item => {
      const ref = this.db()
        .collection(path)
        .doc();
      batch.set(ref, item);
    });
    dataDelete.keys.forEach(key => {
      const ref = this.db()
        .collection(path)
        .doc(key);
      batch.delete(ref);
    });
    return batch.commit();
  };

  addHomeHashmap = (hashmap, key) => {
    const batch = this.db().batch();
    const refHashmaps = this.db()
      .collection(HASHMAPS_COLLECTION)
      .doc(key);
    const refHomeHashmaps = this.db()
      .collection(HOME_HASHMAP_COLLECTION)
      .doc(key);
    batch.update(refHashmaps, { homeHashmap: true });
    batch.set(refHomeHashmaps, hashmap);
    return batch.commit();
  };

  removeHomeHashmap = key => {
    const batch = this.db().batch();
    const refHashmaps = this.db()
      .collection(HASHMAPS_COLLECTION)
      .doc(key);
    const refHomeHashmaps = this.db()
      .collection(HOME_HASHMAP_COLLECTION)
      .doc(key);
    batch.update(refHashmaps, { homeHashmap: false });
    batch.delete(refHomeHashmaps);
    return batch.commit();
  };
}
