import React from 'react';
import { loadFirebaseStore } from 'app/lib/db';
import PropTypes from 'prop-types';

const withSubscriptionHashmapData = WrappedComponent => {
  class Component extends React.Component {
    isMounted = false;

    state = {
      posts: [],
    };

    constructor(props) {
      super(props);
      this.postsRef = undefined;
    }

    async componentDidMount() {
      this.isMounted = true;
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
        if (this.isMounted) {
          this.setState({ hashmap });
          this.setState({ key });
        }
      }
    }

    componentWillUnmount() {
      this.isMounted = false;
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
        .orderBy('index')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            posts.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (this.isMounted) {
            this.setState({
              posts,
            });
          }
        })
        .catch(err => {
          console.error('Error getting posts', err);
        });
    };

    render() {
      const { hashmap, posts, key } = this.state;
      return (
        <WrappedComponent
          hashmap={hashmap}
          posts={posts}
          hashmapKey={key}
          authorId={hashmap ? hashmap.author : undefined}
        />
      );
    }
  }

  Component.propTypes = {
    params: PropTypes.shape({ key: PropTypes.string }).isRequired,
  };

  return Component;
};

export default withSubscriptionHashmapData;
