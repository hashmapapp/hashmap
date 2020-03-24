import loadFirebaseStore from 'app/lib/db';

export class HttpWrapperFirebase {
  constructor() {
    this.db = loadFirebaseStore();
  }

  createItem = (path, item) => {
    return this.db()
      .collection(path)
      .add(item);
  };

  createItems = (path, items) => {
    const batch = this.db().batch();
    items.forEach(item => {
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

  updateItems = (path, keys, items) => {
    const batch = this.db().batch();
    items.forEach((item, index) => {
      const ref = this.db()
        .collection(path)
        .doc(keys[index]);
      batch.update(ref, item);
    });
    return batch.commit();
  };
}
