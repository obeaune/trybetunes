import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCover from '../components/AlbumCover';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    inputSearch: '',
    loading: false,
    albumList: false,
    searchedArtist: false,
  };

  searchButtonClick = async (event) => {
    event.preventDefault();
    const { inputSearch } = this.state;
    this.setState({
      loading: true,
    });
    const getApi = await searchAlbumsAPI(inputSearch);
    this.setState({
      albumList: getApi,
      loading: false,
      inputSearch: '',
      searchedArtist: inputSearch,
    });
  };

  verifySearchLength = (text) => {
    if (text.length <= 1) return true;
  }

  render() {
    const { inputSearch, loading, albumList, searchedArtist } = this.state;

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

        { searchedArtist && <h2>{ `Resultado de álbuns de: ${searchedArtist}` }</h2>}
        { albumList.length === 0 && <span>Nenhum álbum foi encontrado</span> }
        <section>
          {albumList
          && albumList.map(({ collectionId, artworkUrl100, artistName, collectionName,
          }) => (
            <AlbumCover
              key={ collectionId }
              { ...{
                collectionId,
                coverImage: artworkUrl100,
                artistName,
                albumName: collectionName } }
            />))}
        </section>

      </div>
    );
  }
}

export default Search;
