import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>

        { loading ? (<Loading />) : (<p data-testid="header-user-name">{ user }</p>)}
      </header>
    );
  }
}

export default Header;
