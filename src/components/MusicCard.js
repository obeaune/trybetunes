import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track: { trackName, previewUrl } } = this.props;

    return (
      <div>

        <div>
          <h4>{ trackName }</h4>
        </div>

        <audio src={ previewUrl } data-testid="audio-component" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>

      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: string,
    previewUrl: string,
  }).isRequired,
};

export default MusicCard;
