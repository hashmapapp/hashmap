import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import { ItemLi } from 'app/components/UI/styles/styles';
import Footer from 'app/components/UI/footer/footer';
import HomeComponent from 'app/components/home/home';
import Link from 'next/link';
import loadFirebaseStore from 'app/lib/db';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashmapReset } from 'app/redux/actions/hashmapActions';

class home extends Component {
  state = {
    hashmaps: [],
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  async componentDidMount() {
    const FirebaseStore = loadFirebaseStore();
    this.hashmapsRef = FirebaseStore().collection('hashmaps');
    this.unsubscribe = this.hashmapsRef.onSnapshot(this.onCollectionUpdate);
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
    const { hashmapReset } = this.props;
    return (
      <>
        <UINavBar>
          <ul>
            <ItemLi onClick={hashmapReset}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ hashmapReset }, dispatch);

export default connect(null, mapDispatchToProps)(home);
