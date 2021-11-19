import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) {
    super();

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      filteredMovies: [...props.movies],
    };
  }

  filterMovies = (search) => {
    const { movies } = this.props;

    this.setState({
      filteredMovies: movies.filter((movie) => {
        const foundTitle = movie.title.toLowerCase().includes(search);
        const foundSubtitle = movie.subtitle.toLowerCase().includes(search);
        const foundStoryline = movie.storyline.toLowerCase().includes(search);

        return foundTitle || foundSubtitle || foundStoryline;
      }),
    });
  };

  filterBookmarked = (checked) => {
    const { movies } = this.props;
    let tempFilteredMovies = [...movies];

    if (checked) {
      tempFilteredMovies = movies.filter((movie) => movie.bookmarked);
    }

    this.setState({
      filteredMovies: tempFilteredMovies,
    });
  }

  filterByGenre = (genre) => {
    const { movies } = this.props;
    let tempFilteredMovies = [...movies];

    if (genre !== '') {
      tempFilteredMovies = movies.filter((movie) => movie.genre === genre);
    }

    this.setState({
      filteredMovies: tempFilteredMovies,
    });
  }

  handleTextChange = ({ target }) => {
    this.setState({ searchText: target.value });

    if (target.value !== '') this.filterMovies(target.value.toLowerCase());
  };

  handleCheckBox = ({ target }) => {
    this.setState({
      bookmarkedOnly: target.checked,
    });

    this.filterBookmarked(target.checked);
  };

  handleGenreChange = ({ target }) => {
    this.setState({ selectedGenre: target.value });

    this.filterByGenre(target.value);
  }

  handleAddMovie = (newMovieInfo) => {
    const { movies } = this.props;
    const newMovieList = [...movies];

    newMovieList.push({ ...newMovieInfo, bookmarked: false });

    this.setState({ filteredMovies: newMovieList });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, filteredMovies } = this.state;

    return (
      <div className="movie-library">
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleTextChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleCheckBox }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleGenreChange }
        />
        <MovieList movies={ filteredMovies } />
        <AddMovie onClick={ this.handleAddMovie } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
