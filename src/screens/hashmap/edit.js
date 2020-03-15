import React, { Component } from 'react';
import { connect } from 'react-redux';
import UINavBar from 'app/components/UI/navbar/navbar';
import SectionHashmapEdit from 'app/components/hashmap/edit';
import { ItemLi } from 'app/components/UI/styles/styles';
import { HashmapService } from 'app/services/hashmap.service';
import axios from 'axios';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { hashmapUpdate } from 'app/redux/actions/hashmapActions';

class Edit extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    const { param, hashmapUpdate } = this.props;
    axios.get(`http://localhost:3000/hashmaps/${param.id}`).then(hashmaps => {
      const data = { ...hashmaps.data };
      this.setState({ data });
      hashmapUpdate(data);
    });
  }

  handlerSave = evt => {
    evt.preventDefault();
    const { hashmap } = this.props;
    HashmapService.createHashmap(hashmap).then(
      resolve => {
        console.log(resolve);
        Router.push('/');
      },
      error => console.error(error)
    );
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ hashmapUpdate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
