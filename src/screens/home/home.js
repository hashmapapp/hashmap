import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import HomeComponent from 'app/components/home/home';
import { loadFirebaseStore } from 'app/lib/db';
import HourglasLoader from 'app/components/UI/loader/hourglass';
import { HOME_HASHMAP_COLLECTION } from '../lib/constants';

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
    this.hashmapsRef = FirebaseStore()
      .collection(HOME_HASHMAP_COLLECTION)
      .orderBy('createdAt', 'desc');
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
        {hashmaps.length === 0 ? (
          <div className="w-full justify-center h-64 flex items-end">
            <HourglasLoader className="flex-1" />
          </div>
        ) : (
          <HomeComponent hashmaps={hashmaps} />
        )}
      </>
    );
  }
}

export default home;
