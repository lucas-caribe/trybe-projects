import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      validSearch: false,
      isFetching: false,
      searched: false,
      artist: '',
      albums: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderAlbumList = this.renderAlbumList.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      searchTerm: value,
      validSearch: value.length >= 2,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;

    this.setState({
      searched: true,
      searchTerm: '',
      isFetching: true,
    });

    const albums = await searchAlbumsAPI(searchTerm);

    this.setState({
      isFetching: false,
      albums,
      artist: searchTerm,
    });
  }

  renderSearchForm() {
    const { searchTerm, validSearch } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="search-artist-input"
          type="text"
          id="searchTerm"
          value={ searchTerm }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !validSearch }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  renderAlbumList() {
    const { albums, artist, searched } = this.state;

    if (!searched) return null;

    if (albums.length) return <AlbumList artist={ artist } albums={ albums } />;

    return <p>Nenhum álbum foi encontrado</p>;
  }

  render() {
    const { isFetching } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {this.renderSearchForm()}
              {this.renderAlbumList()}
            </>
          )}
        </div>
      </>
    );
  }
}

export default Search;
