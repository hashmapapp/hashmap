import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import { ItemLi } from 'app/components/UI/styles/styles';
import Footer from 'app/components/UI/footer/footer';
import HomeComponent from 'app/components/home/home';
import Link from 'next/link';
import loadFirebaseStore from 'app/lib/db';

class home extends Component {
  state = {
    hashmaps: undefined,
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  async componentDidMount() {
    const FirebaseStore = await loadFirebaseStore();
    this.ref = FirebaseStore.collection('hashmaps');
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
        <UINavBar>
          <ul>
            <ItemLi>
              <Link href="/edit">
                <a>Criar HashMap</a>
              </Link>
            </ItemLi>
            <ItemLi>
              <Link href="/about">
                <a>Sobre</a>
              </Link>
            </ItemLi>
            <ItemLi>
              <Link href="/view">
                <a>Ler</a>
              </Link>
            </ItemLi>
          </ul>
        </UINavBar>
        {/* <ModalAuth /> */}
        <HomeComponent hashmaps={hashmaps} />
        <Footer />
      </>
    );
  }
}

export default home;
