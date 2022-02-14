import React from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCover extends React.Component {
  render() {
    const { coverImage, artistName, albumName, collectionId } = this.props;

    return (
      <div>

        <img alt="cover of the album" src={ coverImage } />
        <p>{ artistName }</p>
        <p>{ albumName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        />

      </div>
    );
  }
}

AlbumCover.propTypes = {
  coverImage: string.isRequired,
  artistName: string.isRequired,
  albumName: string.isRequired,
  collectionId: number.isRequired,
};

export default AlbumCover;
