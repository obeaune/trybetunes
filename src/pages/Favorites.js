import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
      </div>
    );
  }
}

export default Favorites;
