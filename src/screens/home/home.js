import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import HomeComponent from 'app/components/home/home';
import { loadFirebaseStore } from 'app/lib/db';

class home extends Component {
  state = {
    hashmaps: [],
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    const FirebaseStore = loadFirebaseStore();
    this.hashmapsRef = FirebaseStore().collection('hashmaps');
    this.unsubscribe = this.hashmapsRef.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const hashmaps = [];
    querySnapshot.forEach(doc => {
      hashmaps.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    this.setState({
      hashmaps,
    });
  };

  render() {
    const { hashmaps } = this.state;

    return (
      <>
        <UINavBar typeNav="home" />
        <HomeComponent hashmaps={hashmaps} />
      </>
    );
  }
}

export default home;
