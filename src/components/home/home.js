import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ListHashmaps from 'app/components/home/list-hashmaps/list-hashmaps';
import TopHashmaps from 'app/components/home/top-hashmaps/top-hashmaps';
import { Section } from 'app/components/UI/styles/styles';
import axios from 'axios';

class HomeComponent extends Component {
  state = {
    hashmaps: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/hashmaps/`).then(hashmaps => {
      console.log(hashmaps);
      this.setState({ hashmaps: hashmaps.data });
    });
  }

  render() {
    const { hashmaps } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {hashmaps.map(hashmap => (
              <>
                <ListHashmaps key={hashmap.id} data={hashmap} />
                <hr />
              </>
            ))}
          </div>
          <div className="col-lg-3">
            <TopHashmaps />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
