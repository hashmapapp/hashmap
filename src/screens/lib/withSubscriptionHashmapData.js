import React from 'react';
import { loadFirebaseStore } from 'app/lib/db';
import PropTypes from 'prop-types';

const withSubscriptionHashmapData = WrappedComponent => {
  class Component extends React.Component {
    state = {
      posts: [],
    };

    constructor(props) {
      super(props);
      this.postsRef = undefined;
    }

    async componentDidMount() {
      const { params } = this.props;
      const { key } = params;
      if (key) {
        const FirebaseStore = loadFirebaseStore();
        this.getPosts(FirebaseStore, key);
        const hashmap = await this.getDocument(FirebaseStore, 'hashmaps', key);
        const author = await this.getDocument(
          FirebaseStore,
          'users',
          hashmap.author
        );
        hashmap.author = author;
        this.setState({ hashmap });
        this.setState({ key });
      }
    }

    getDocument = (fs, collection, key) => {
      return new Promise((resolve, reject) => {
        fs()
          .collection(collection)
          .doc(key)
          .get()
          .then(doc => {
            resolve({ ...doc.data(), key });
          })
          .catch(reject);
      });
    };

    getPosts = (fs, key) => {
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
  }

  Component.propTypes = {
    params: PropTypes.shape({ key: PropTypes.string }).isRequired,
  };

  return Component;
};

export default withSubscriptionHashmapData;
