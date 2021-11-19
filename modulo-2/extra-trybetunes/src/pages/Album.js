import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumInfo: {},
      albumTracks: [],
      favoriteSongs: [],
      isFetching: true,
    };

    this.renderAlbumInfo = this.renderAlbumInfo.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  async fetchAlbum() {
    const { match } = this.props;
    const { id } = match.params;

    this.setState({ isFetching: true });

    const fullAlbumInfo = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();

    const albumInfo = fullAlbumInfo[0];
    const albumTracks = fullAlbumInfo.slice(1);

    this.setState({
      albumInfo,
      albumTracks,
      favoriteSongs,
      isFetching: false,
    });
  }

  async toggleFavorite(track, checked) {
    this.setState({ isFetching: true });

    await (checked ? addSong(track) : removeSong(track));

    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      isFetching: false,
      favoriteSongs,
    });
  }

  renderAlbumInfo() {
    const { albumInfo, albumTracks, favoriteSongs } = this.state;
    const { artistName, collectionName } = albumInfo;

    return (
      <div className="album-info">
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {albumTracks.map((track) => {
          const isFavorite = favoriteSongs.some(
            ({ trackId }) => track.trackId === trackId,
          );

          return (
            <MusicCard
              key={ track.trackId }
              track={ track }
              isFavorite={ isFavorite }
              toggleFavorite={ this.toggleFavorite }
            />
          );
        })}
      </div>
    );
  }

  render() {
    const { isFetching } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          {isFetching ? <Loading /> : this.renderAlbumInfo()}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
