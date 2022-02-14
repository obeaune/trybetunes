import React, { Component } from 'react';
import PropTypes, { string, number, bool } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  }

  componentDidMount() {
    const { check } = this.props;
    this.setState({ isChecked: check });
  }

  handleCheckboxChange = async (track) => {
    this.setState({ loading: true, isChecked: true });
    await addSong(track);
    this.setState({ loading: false });
  }

  render() {
    const { loading, isChecked } = this.state;
    const { track } = this.props;
    const { trackName, previewUrl, trackId } = track;

    return (
      <div>

        <div>
          <h4>{ trackName }</h4>
          <label htmlFor={ trackId }>
            Favorita
            <input
              checked={ isChecked }
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
  check: bool.isRequired,
  track: PropTypes.shape({
    trackName: string,
    previewUrl: string,
    trackId: number,
  }).isRequired,
};

export default MusicCard;
