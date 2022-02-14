import React, { Component } from 'react';
import PropTypes, { string, number } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  }

  handleCheckboxChange = async (track) => {
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { track } = this.props;
    const { trackName, previewUrl, trackId } = track;

    return (
      <div>

        <div>
          <h4>{ trackName }</h4>
          <label htmlFor={ trackId }>
            Favorita:
            <input
              onChange={ () => this.handleCheckboxChange(track) }
              type="checkbox"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>

        <audio src={ previewUrl } data-testid="audio-component" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        {loading && <Loading />}

      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: string,
    previewUrl: string,
    trackId: number,
  }).isRequired,
};

export default MusicCard;
