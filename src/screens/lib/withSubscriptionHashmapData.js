import React from 'react';
import { loadFirebaseStore } from 'app/lib/db';

const withSubscriptionHashmapData = WrappedComponent => {
  return class extends React.Component {
    state = {
      posts: [],
    };

    constructor(props) {
      super(props);
      this.postsRef = undefined;
    }

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
      const ref = fs().collection(`hashmaps/${key}/posts`);
      const posts = [];
      this.postsRef = ref
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            posts.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          this.setState({
            posts,
          });
        })
        .catch(err => {
          console.log('Error getting posts', err);
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
