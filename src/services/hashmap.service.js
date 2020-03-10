import { HttpWrapper } from './http-wrapper';

export class HashmapService extends HttpWrapper {
  static createHashmap = async hashmap => {
    const newHashmap = {
      title: hashmap.title,
      subtitle: hashmap.subtitle,
      description: hashmap.description,
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

    super.createItem(newHashmap, 'http://localhost:3000/hashmaps');
  };
}
