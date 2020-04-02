import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UINavBar from 'app/components/UI/navbar/navbar';
import { ItemLi } from 'app/components/UI/styles/styles';
import Footer from 'app/components/UI/footer/footer';
import HomeComponent from 'app/components/home/home';
import Link from 'next/link';
import { loadFirebaseStore } from 'app/lib/db';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashmapReset } from 'app/redux/actions/hashmapActions';
import { authorization } from 'app/screens/lib/authorization';
import { CREATE_HASHMAP_BUTTON } from 'app/screens/lib/constants';

class home extends Component {
  state = {
    hashmaps: [],
    _createHashmapButton: false,
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    const FirebaseStore = loadFirebaseStore();
    this.hashmapsRef = FirebaseStore().collection('hashmaps');
    this.unsubscribe = this.hashmapsRef.onSnapshot(this.onCollectionUpdate);
    this.setState({
      _createHashmapButton: authorization(CREATE_HASHMAP_BUTTON),
    });
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
    const { hashmaps, _createHashmapButton } = this.state;
    const { handlerReset } = this.props;
    return (
      <>
        <UINavBar>
          <ul>
            {_createHashmapButton && (
              <ItemLi onClick={handlerReset}>
                <Link href="/edit">
                  <a>Criar HashMap</a>
                </Link>
              </ItemLi>
            )}
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

home.propTypes = {
  handlerReset: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handlerReset: hashmapReset }, dispatch);

export default connect(null, mapDispatchToProps)(home);
