import React, { Component } from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import SectionHashmapEdit from 'app/components/hashmap/edit';
// import axios from 'axios';

export default class Edit extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    // axios.get(`http://localhost:3000/hashmaps/${1}`).then(hashmaps => {
    //   const data = { ...hashmaps.data };
    //   axios
    //     .get(`http://localhost:3000/posts`, { params: { hashmapId: 1 } })
    //     .then(posts => {
    //       data.posts = posts.data;
    //       this.setState({ data });
    //     });
    // });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <UINavBar />
        <SectionHashmapEdit data={data} />
      </>
    );
  }
}
