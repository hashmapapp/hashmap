import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import { ItemLi } from 'app/components/UI/styles/styles';
import Link from 'next/link';

class View extends Component {
  state = {
    data: undefined,
  };

  constructor(props) {
    super(props);
    // this.ref = firebase.firestore().collection('hashmaps');
    this.unsubscribe = null;
  }

  // onCollectionUpdate = querySnapshot => {
  //   const boards = [];
  //   querySnapshot.forEach(doc => {
  //     const { title, description, author } = doc.data();
  //     boards.push({
  //       key: doc.id,
  //       doc, // DocumentSnapshot
  //       title,
  //       description,
  //       author,
  //     });
  //   });
  //   this.setState({
  //     boards,
  //   });
  // };

  componentDidMount() {
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { data } = this.state;
    const { param } = this.props;
    return (
      <>
        <UINavBar>
          <ul>
            <ItemLi>
              <Link href={`/edit?id=${param.id}`}>
                <a>Editar HashMap</a>
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
        {data && <SectionHashmapView data={data} />}
        <UISectionComments />
        <UISectionMoreHashMaps />
        <UIFooter />
      </>
    );
  }
}

export default View;
