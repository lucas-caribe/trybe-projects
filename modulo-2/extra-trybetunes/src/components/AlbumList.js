import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumList extends Component {
  render() {
    const { artist, albums } = this.props;

    return (
      <div>
        <p>{`Resultado de álbuns de: ${artist}`}</p>

        {albums.map(({ collectionId, collectionName }) => (
          <Link
            key={ collectionId }
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            {collectionName}
          </Link>
        ))}
      </div>
    );
  }
}

AlbumList.propTypes = {
  artist: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AlbumList;
