import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';

const movieGenre = [
  // { value: '', text: 'Todos' },
  { value: 'action', text: 'Ação' },
  { value: 'comedy', text: 'Comédia' },
  { value: 'thriller', text: 'Suspense' },
];

const initialState = {
  title: '',
  subtitle: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

class AddMovie extends React.Component {
  constructor() {
    super();

    this.state = initialState;
  }

  handleInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { onClick } = this.props;

    onClick(this.state);
    this.setState(initialState);
  }

  render() {
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        <TextInput
          label="Título"
          id="title-input"
          value={ title }
          onChange={ this.handleInput }
        />
        <TextInput
          label="Subtítulo"
          id="subtitle-input"
          value={ subtitle }
          onChange={ this.handleInput }
        />
        <TextInput
          label="Imagem"
          id="image-input"
          value={ imagePath }
          onChange={ this.handleInput }
        />
        <TextArea
          label="Sinopse"
          id="storyline-input"
          name="storyline"
          value={ storyline }
          onChange={ this.handleInput }
        />
        <TextInput
          label="Avaliação"
          type="number"
          id="rating-input"
          value={ rating }
          onChange={ this.handleInput }
        />
        <SelectInput
          label="Gênero"
          id="genre-input"
          name="genre"
          value={ genre }
          onChange={ this.handleInput }
          options={ movieGenre }
        />
        <button type="button" onClick={ this.handleClick } data-testid="send-button">
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
