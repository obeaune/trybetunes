import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    inputSearch: '',
    loading: false,
  };

  searchButtonClick = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
  };

  verifySearchLength = (text) => {
    if (text.length <= 1) return true;
  }

  render() {
    const { inputSearch, loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="inputSearch">
            Nome do artista:
            <input
              value={ inputSearch }
              onChange={ ({ target }) => this.setState({ inputSearch: target.value }) }
              id="inputSearch"
              type="text"
              data-testid="search-artist-input"
            />
          </label>

          <button
            onClick={ this.searchButtonClick }
            disabled={ this.verifySearchLength(inputSearch) }
            type="submit"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>

          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

export default Search;
