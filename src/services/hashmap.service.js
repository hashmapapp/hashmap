import { HttpWrapperFirebase } from './http-wrapper';

const HASHMAPS_COLLECTION = 'hashmaps';
const POSTS_COLLECTION = 'posts';

export class HashmapService {
  static saveHashmap = hashmap => {
    const fb = new HttpWrapperFirebase();
    console.log(hashmap);
    if (hashmap.key) {
      HashmapService.updateHashmap(fb, hashmap);
    } else {
      HashmapService.createHashmap(fb, hashmap);
    }
  };

  static updateHashmap = (fb, hashmap) => {
    const newHashmap = { ...hashmap };
    delete newHashmap.posts;
    delete newHashmap.key;
    delete newHashmap.createIn;
    newHashmap.updateIn = fb.db.FieldValue.serverTimestamp();
    fb.updateItem(HASHMAPS_COLLECTION, hashmap.key, newHashmap).then(() => {
      console.log('Hashmap atualizado com sucesso!');
      const createPosts = [];
      const updatePosts = [];
      hashmap.posts.forEach(post => {
        if (post.key) updatePosts.push(post);
        else createPosts.push(post);
      });
      HashmapService.createPosts(
        fb,
        `${HASHMAPS_COLLECTION}/${hashmap.key}`,
        createPosts
      );
      HashmapService.updatePosts(
        fb,
        `${HASHMAPS_COLLECTION}/${hashmap.key}`,
        updatePosts
      );
    });
  };

  static updatePosts = (fb, path, posts) => {
    const keys = [];
    const newPosts = posts.map(post => {
      const newPost = { ...post };
      delete newPost.key;
      delete newPost.createIn;
      delete newPost.react;
      delete newPost.status;
      newPost.updateIn = fb.db.FieldValue.serverTimestamp();
      keys.push(post.key);
      return newPost;
    });
    fb.updateItems(`${path}/${POSTS_COLLECTION}`, keys, newPosts).then(() => {
      console.log('Posts Atualizados com Sucesso!');
    });
  };

  static createHashmap = (fb, hashmap) => {
    const newHashmap = { ...hashmap };
    delete newHashmap.posts;
    delete newHashmap.key;
    newHashmap.createIn = fb.db.FieldValue.serverTimestamp();
    newHashmap.updateIn = fb.db.FieldValue.serverTimestamp();
    fb.createItem(HASHMAPS_COLLECTION, newHashmap).then(hashmapSucess => {
      console.log('Hashmap criado com sucesso!');
      const { path } = hashmapSucess;
      HashmapService.createPosts(fb, path, hashmap.posts);
    });
  };

  static createPosts = (fb, path, posts) => {
    const newPosts = posts.map(post => {
      const newPost = { ...post };
      delete newPost.temporaryKey;
      return {
        ...newPost,
        author: '',
        createIn: fb.db.FieldValue.serverTimestamp(),
        updateIn: fb.db.FieldValue.serverTimestamp(),
        link: {
          image: '',
          title: '',
          url: '',
        },
        react: {
          dissatisfied: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          like: 0,
          rocket: 0,
          smiley: 0,
          unlike: 0,
        },
        status: 'VISIBLE',
      };
    });
    fb.createItems(`${path}/${POSTS_COLLECTION}`, newPosts).then(() => {
      console.log('Posts Criados com Sucesso!');
    });
  };
}
