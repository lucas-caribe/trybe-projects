import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { toggleFavorite, track } = this.props;
    const { checked } = target;

    toggleFavorite(track, checked);
  }

  render() {
    const { track, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = track;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            name="favorite"
            id={ trackId }
            checked={ isFavorite }
            onChange={ this.handleChange }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  ).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
