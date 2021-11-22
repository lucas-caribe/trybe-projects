import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: undefined,
      status: 'loading',
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  deleteMovie = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    movieAPI.deleteMovie(Number(id));
  };

  fetchMovie = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const data = await movieAPI.getMovie(Number(id));

    if (data) {
      this.setState({ movie: data, status: 'ok' });
    }
  };

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { movie, status } = this.state;
    const {
      match: { url },
    } = this.props;

    if (status === 'loading') {
      return <Loading />;
    }

    const { title, imagePath, subtitle, storyline, genre, rating } = movie;

    return (
      <div data-testid="movie-details">
        <p>{title}</p>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <Link to={ `${url}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={ this.deleteMovie }>
          DELETAR
        </Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieDetails;
