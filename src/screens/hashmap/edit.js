import React, { Component } from 'react';
import { connect } from 'react-redux';
import UINavBar from 'app/components/UI/navbar/navbar';
import SectionHashmapEdit from 'app/components/hashmap/edit';
import { ItemLi } from 'app/components/UI/styles/styles';
import { HashmapService } from 'app/services/hashmap.service';

class Edit extends Component {
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

  handlerSave = evt => {
    evt.preventDefault();
    const { hashmap } = this.props;
    console.log(hashmap);
    HashmapService.createHashmap(hashmap);
  };

  render() {
    const { data } = this.state;
    const { postsLength } = this.props;
    return (
      <>
        <UINavBar fixed>
          <ul>
            <ItemLi>
              <a href="/" onClick={this.handlerSave}>
                Salvar
              </a>
            </ItemLi>
            <ItemLi>
              <a>Posts: {postsLength}</a>
            </ItemLi>
          </ul>
        </UINavBar>
        <SectionHashmapEdit data={data} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  postsLength: state.hashmap.posts.length,
  hashmap: state.hashmap,
});

export default connect(mapStateToProps)(Edit);
