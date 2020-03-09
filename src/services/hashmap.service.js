import { HttpWrapper } from './http-wrapper';

export class HashmapService extends HttpWrapper {
  static createHashmap = async hashmap => {
    console.log('createHashmap');

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
      posts: hashmap.posts,
    };

    super.createItem(newHashmap, 'http://localhost:3000/hashmaps');
  };
}
