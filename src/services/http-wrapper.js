import { loadFirebaseStore } from 'app/lib/db';

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
}
