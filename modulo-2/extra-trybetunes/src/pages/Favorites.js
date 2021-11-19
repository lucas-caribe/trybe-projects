import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteSongs: [],
      isFetching: true,
    };

    this.renderFavoriteSongs = this.renderFavoriteSongs.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async fetchFavoriteSongs() {
    this.setState({ isFetching: true });

    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      isFetching: false,
      favoriteSongs,
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

  renderFavoriteSongs() {
    const { favoriteSongs } = this.state;

    return favoriteSongs.map((track) => (
      <MusicCard
        key={ track.trackId }
        track={ track }
        toggleFavorite={ this.toggleFavorite }
        isFavorite
      />
    ));
  }

  render() {
    const { isFetching } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {isFetching ? <Loading /> : this.renderFavoriteSongs()}
        </div>
      </>
    );
  }
}

export default Favorites;
