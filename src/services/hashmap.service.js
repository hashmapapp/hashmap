import { HttpWrapper } from './http-wrapper';

export class HashmapService extends HttpWrapper {
  static createHashmap = async hashmap => {
    console.log(hashmap);

    const newHashmap = {
      ...hashmap,
      info: new Date().toDateString(),
      author: {
        name: 'Kleyson Morais',
        avatar: 'imgs/avatar/pp.jpg',
        bio: 'Alguma coisa interessante aqui',
      },
      posts: hashmap.posts.map(post => {
        post.react = {
          like: 0,
          heart: 0,
          unlike: 0,
          smiley: 0,
          dissatisfied: 0,
          rocket: 0,
          hooray: 0,
          eyes: 0,
        };
        return post;
      }),
    };
    console.log(newHashmap);
    if (newHashmap.id) {
      console.log('Update Item');

      super.updateItem(
        newHashmap,
        'http://localhost:3000/hashmaps',
        newHashmap.id
      );
    } else {
      console.log('Create Item');
      super.createItem(newHashmap, 'http://localhost:3000/hashmaps');
    }
  };
}
