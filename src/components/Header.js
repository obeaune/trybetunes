import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    loading: true,
  };

  componentDidMount = async () => {
    const { name } = await getUser();
    this.setState({ user: name, loading: false });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        { loading ? (<Loading />) : (<p data-testid="header-user-name">{ user }</p>)}
      </header>
    );
  }
}

export default Header;
