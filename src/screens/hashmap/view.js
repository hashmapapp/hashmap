import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import axios from 'axios';
import { ItemLi } from 'app/components/UI/styles/styles';

class View extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/hashmaps/${1}`).then(hashmaps => {
      const data = { ...hashmaps.data };
      axios
        .get(`http://localhost:3000/posts`, { params: { hashmapId: 1 } })
        .then(posts => {
          data.posts = posts.data;
          this.setState({ data });
        });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <UINavBar>
          <ItemLi>
            <a href="/">Item 1</a>
          </ItemLi>
          <ItemLi>
            <a href="/">Item 2</a>
          </ItemLi>
          <ItemLi>
            <a href="/">Item 3</a>
          </ItemLi>
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
