import { HttpWrapperFirebase } from './http-wrapper';

const HASHMAPS_COLLECTION = 'hashmaps';
const POSTS_COLLECTION = 'posts';

export class HashmapService {
  static saveHashmap = (hashmap, callback, userId) => {
    const fb = new HttpWrapperFirebase();
    if (hashmap.key) {
      HashmapService.updateHashmap(fb, hashmap, callback);
    } else {
      HashmapService.createNewHashmap(fb, hashmap, callback, userId);
    }
  };

  static deleteHashmap = (key, callback) => {
    const fb = new HttpWrapperFirebase();
    fb.deleteItem(HASHMAPS_COLLECTION, key).then(() => {
      console.log(`Hashmap ${key} removido com sucesso`);
      callback();
    });
  };

  static updateHashmap = (fb, hashmap, callback) => {
    const newHashmap = { ...hashmap };
    delete newHashmap.posts;
    delete newHashmap.key;
    delete newHashmap.createdAt;
    newHashmap.author = newHashmap.author.key;
    newHashmap.updatedAt = fb.db.FieldValue.serverTimestamp();
    fb.updateItem(HASHMAPS_COLLECTION, hashmap.key, newHashmap).then(() => {
      console.log('Hashmap atualizado com sucesso!');
      HashmapService.updatePosts(fb, hashmap, callback);
    });
  };

  static updatePosts = (fb, hashmap, callback) => {
    const postsToCreate = [];
    const postsToUpdate = [];
    const postsToDelete = [];
    hashmap.posts.forEach(post => {
      if (post.key.startsWith('DELETE')) postsToDelete.push(post);
      else if (post.key.startsWith('_')) postsToCreate.push(post);
      else postsToUpdate.push(post);
    });
    const dataUpdate = HashmapService.getDataUpdatePosts(fb, postsToUpdate);
    const dataCreate = HashmapService.getDataCreatePosts(fb, postsToCreate);
    const dataDelete = HashmapService.getDataDeletePosts(postsToDelete);
    fb.updateItems(
      `${HASHMAPS_COLLECTION}/${hashmap.key}/${POSTS_COLLECTION}`,
      dataUpdate,
      dataCreate,
      dataDelete
    ).then(() => {
      console.log('Posts atualizados com sucesso!');
      callback();
    });
  };

  // ======================================================================= //

  static createNewHashmap = (fb, hashmap, callback, userId) => {
    const newHashmap = { ...hashmap };
    delete newHashmap.posts;
    delete newHashmap.key;
    newHashmap.createdAt = fb.db.FieldValue.serverTimestamp();
    newHashmap.updatedAt = fb.db.FieldValue.serverTimestamp();
    newHashmap.author = userId;
    fb.createItem(HASHMAPS_COLLECTION, newHashmap).then(hashmapSucess => {
      console.log('Hashmap criado com sucesso!');
      const { path } = hashmapSucess;
      HashmapService.createPosts(path, fb, hashmap, callback, userId);
    });
  };

  static createPosts = (path, fb, hashmap, callback, userId) => {
    const dataCreate = HashmapService.getDataCreatePosts(
      fb,
      hashmap.posts.filter(post => !post.key.startsWith('DELETE')),
      userId
    );
    fb.createItems(`${path}/${POSTS_COLLECTION}`, dataCreate).then(() => {
      console.log('Posts criados com sucesso!');
      callback();
    });
  };

  // ======================================================================= //

  static getDataUpdatePosts = (fb, posts) => {
    const keys = [];
    const items = posts.map(post => {
      const updatePost = { ...post };
      delete updatePost.key;
      delete updatePost.createdAt;
      delete updatePost.react;
      delete updatePost.status;
      updatePost.updatedAt = fb.db.FieldValue.serverTimestamp();
      keys.push(post.key);
      return updatePost;
    });
    return { keys, items };
  };

  static getDataCreatePosts = (fb, posts, userId) => {
    const items = posts.map(post => {
      const newPost = { ...post };
      delete newPost.key;
      return {
        ...newPost,
        author: userId,
        createdAt: fb.db.FieldValue.serverTimestamp(),
        updatedAt: fb.db.FieldValue.serverTimestamp(),
        status: 'VISIBLE',
      };
    });
    return { items };
  };

  static getDataDeletePosts = posts => {
    const keys = [];
    posts.forEach(post => {
      const key = post.key.substr(11);
      if (!key.startsWith('_')) keys.push(key);
    });
    return { keys };
  };
}
