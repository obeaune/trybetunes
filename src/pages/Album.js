import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artist: '',
    songs: [],
    albumName: '',
    favorites: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getSongApi = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    const filterSongs = getSongApi.filter(({ trackId }) => trackId);
    this.setState({
      songs: filterSongs,
      artist: getSongApi[0].artistName,
      albumName: getSongApi[0].collectionName,
      favorites: favoriteSongs,
    });
  }

  render() {
    const { artist, songs, albumName, favorites } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{ artist }</span>
        <span data-testid="album-name">{ albumName }</span>
        { songs.map((song) => (
          <MusicCard
            key={ song.id }
            track={ song }
            check={ favorites.some((item) => item.id === song.id) }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = { match: shape({ params: shape({ id: string }) }).isRequired };

export default Album;
