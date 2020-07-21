import {
  HASHMAPS_COLLECTION,
  POSTS_COLLECTION,
} from 'app/screens/lib/constants';
import { HttpWrapperFirebase } from './http-wrapper';

export class HashmapService {
  static saveHashmap = (hashmap, callback, userId) => {
    const fb = new HttpWrapperFirebase();
    if (hashmap.key) {
      HashmapService.updateHashmap(fb, hashmap, callback, userId);
    } else {
      HashmapService.createNewHashmap(fb, hashmap, callback, userId);
    }
  };

  static deleteHashmap = (key, callback) => {
    const fb = new HttpWrapperFirebase();
    fb.deleteItem(HASHMAPS_COLLECTION, key).then(() => {
      // console.log(`Hashmap ${key} removido com sucesso`);
      callback();
    });
  };

  static updateHashmap = (fb, hashmap, callback, userId) => {
    const newHashmap = { ...hashmap };
    delete newHashmap.posts;
    delete newHashmap.key;
    delete newHashmap.createdAt;
    newHashmap.author = newHashmap.author.key;
    newHashmap.updatedAt = fb.db.FieldValue.serverTimestamp();
    fb.updateItem(HASHMAPS_COLLECTION, hashmap.key, newHashmap).then(() => {
      // console.log('Hashmap atualizado com sucesso!');
      HashmapService.updatePosts(fb, hashmap, callback, userId);
    });
  };

  static updatePosts = (fb, hashmap, callback, userId) => {
    const postsToCreate = [];
    const postsToUpdate = [];
    const postsToDelete = [];
    hashmap.posts.forEach(post => {
      if (post.key.startsWith('DELETE')) postsToDelete.push(post);
      else if (post.key.startsWith('_')) postsToCreate.push(post);
      else postsToUpdate.push(post);
    });
    const dataUpdate = HashmapService.getDataUpdatePosts(fb, postsToUpdate);
    const dataCreate = HashmapService.getDataCreatePosts(
      fb,
      postsToCreate,
      userId
    );
    const dataDelete = HashmapService.getDataDeletePosts(postsToDelete);
    // console.log(dataUpdate);
    // console.log(dataCreate);
    // console.log(dataDelete);

    fb.updateItems(
      `${HASHMAPS_COLLECTION}/${hashmap.key}/${POSTS_COLLECTION}`,
      dataUpdate,
      dataCreate,
      dataDelete
    ).then(() => {
      // console.log('Posts atualizados com sucesso!');
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
      // console.log('Hashmap criado com sucesso!');
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
      // console.log('Posts criados com sucesso!');
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
      // delete updatePost.status;
      updatePost.updatedAt = fb.db.FieldValue.serverTimestamp();
      keys.push(post.key);
      return updatePost;
    });
    return { keys, items };
  };

  static getDataCreatePosts = (fb, posts, userId) => {
    const items = posts.map((post, index) => {
      return {
        content: post.content,
        author: userId,
        createdAt: fb.db.FieldValue.serverTimestamp(),
        updatedAt: fb.db.FieldValue.serverTimestamp(),
        index,
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

  addHomeHashmap = hashmap => {
    const fb = new HttpWrapperFirebase();
    const { author, key } = hashmap;
    const authorData = {
      displayName: author.displayName,
      imageUrl:
        author.photoURL && author.photoURL.url ? author.photoURL.url : '',
      username: author.username,
    };
    const hash = {
      createdAt: hashmap.createdAt,
      imageUrl: hashmap.imageUrl ? hashmap.imageUrl : '',
      title: hashmap.title,
      subtitle: hashmap.subtitle,
      authorData,
    };
    fb.addHomeHashmap(hash, key)
      .then(() => {
        // console.log('Adicionado à home page com sucesso');
      })
      .catch(error => console.error(error));
  };

  removeHomeHashmap = hashmapKey => {
    const fb = new HttpWrapperFirebase();
    fb.removeHomeHashmap(hashmapKey)
      .then(() => {
        // console.log('Removido da home page com sucesso');
      })
      .catch(error => console.error(error));
  };
}
