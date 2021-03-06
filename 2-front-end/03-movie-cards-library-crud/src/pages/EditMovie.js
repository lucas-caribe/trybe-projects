import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { MovieForm, Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: undefined, status: 'loading', shouldRedirect: false };
  }

  componentDidMount() {
    this.fetchMovie();
  }

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

  handleSubmit = (updatedMovie) => {
    movieAPI.updateMovie(updatedMovie);

    this.setState({ shouldRedirect: true });
  };

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditMovie;
