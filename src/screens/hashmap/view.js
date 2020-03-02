import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import UIFooter from 'app/components/UI/footer/footer';
import SectionHashmapView from 'app/components/hashmap/view';
import UISectionComments from 'app/components/UI/comments/comments';
import UISectionMoreHashMaps from 'app/components/UI/more-hashmaps/more-hashmaps';
import axios from 'axios';

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
        <UINavBar />
        {data && <SectionHashmapView data={data} />}
        <UISectionComments />
        <UISectionMoreHashMaps />
        <UIFooter />
      </>
    );
  }
}

export default View;
