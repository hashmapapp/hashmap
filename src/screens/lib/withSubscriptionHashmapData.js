import React from 'react';
import { collectionData } from 'rxfire/firestore';
import loadFirebaseStore from 'app/lib/db';

const withSubscriptionHashmapData = WrappedComponent => {
  return class extends React.Component {
    state = {
      hashmap: undefined,
      posts: [],
      param: undefined,
    };

    componentDidMount() {
      const { params } = this.props;
      const { key } = params;
      if (key) {
        const FirebaseStore = loadFirebaseStore();
        this.getHashmap(FirebaseStore, key);
        this.getPosts(FirebaseStore, key);
        this.setState({ key });
      }
    }

    getHashmap = async (fs, key) => {
      const snapshot = await fs()
        .collection('hashmaps')
        .doc(key)
        .get();
      const hashmap = { ...snapshot.data(), key };
      this.setState({ hashmap });
    };

    getPosts = async (fs, key) => {
      const postsRef = fs().collection(`hashmaps/${key}/posts`);
      collectionData(postsRef, 'key').subscribe(posts => {
        this.setState({ posts });
      });
    };

    render() {
      const { hashmap, posts, key } = this.state;
      return (
        <WrappedComponent hashmap={hashmap} posts={posts} hashmapKey={key} />
      );
    }
  };
};

export default withSubscriptionHashmapData;
