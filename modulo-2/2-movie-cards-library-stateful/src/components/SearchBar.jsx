import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';
import SelectInput from './SelectInput';

const movieGenre = [
  { value: '', text: 'Todos' },
  { value: 'action', text: 'Ação' },
  { value: 'comedy', text: 'Comédia' },
  { value: 'thriller', text: 'Suspense' },
];

class SearchBar extends React.Component {
  render() {
    const {
      searchText,
      onSearchTextChange,
      bookmarkedOnly,
      onBookmarkedChange,
      selectedGenre,
      onSelectedGenreChange,
    } = this.props;

    return (
      <form
        onSubmit={ (event) => event.preventDefault() }
        className="search-bar"
        data-testid="search-bar-form"
      >
        <TextInput
          label="Inclui o texto:"
          id="text-input"
          name="searchText"
          value={ searchText }
          onChange={ onSearchTextChange }
        />

        <label htmlFor="bookmarked-only" data-testid="checkbox-input-label">
          <input
            type="checkbox"
            id="bookmarked-only"
            data-testid="checkbox-input"
            checked={ bookmarkedOnly }
            onChange={ onBookmarkedChange }
          />
          Mostrar somente favoritos
        </label>

        <SelectInput
          label="Filtrar por gênero"
          id="select-input"
          name="genre"
          value={ selectedGenre }
          onChange={ onSelectedGenreChange }
          options={ movieGenre }
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};

export default SearchBar;
