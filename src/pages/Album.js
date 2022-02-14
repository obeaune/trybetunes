import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    songs: [],
    albumName: '',
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const getSongApi = await getMusics(id);
    const filterSongs = getSongApi.filter(({ trackId }) => trackId);
    this.setState({
      songs: filterSongs,
      artist: getSongApi[0].artistName,
      albumName: getSongApi[0].collectionName,
    });
  }

  render() {
    const { artist, songs, albumName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{ artist }</span>
        <span data-testid="album-name">{ albumName }</span>
        { songs.map((song) => (
          <MusicCard key={ song.id } track={ song } />
        ))}
      </div>
    );
  }
}

Album.propTypes = { match: shape({ params: shape({ id: string }) }).isRequired };

export default Album;
