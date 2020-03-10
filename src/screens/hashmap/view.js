import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import axios from 'axios';
import { ItemLi } from 'app/components/UI/styles/styles';
import Link from 'next/link';

class View extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    const { param } = this.props;
    axios.get(`http://localhost:3000/hashmaps/${param.id}`).then(hashmaps => {
      const data = { ...hashmaps.data };
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
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
        {data && <SectionHashmapView data={data} />}
        <UISectionComments />
        <UISectionMoreHashMaps />
        <UIFooter />
      </>
    );
  }
}

export default View;
