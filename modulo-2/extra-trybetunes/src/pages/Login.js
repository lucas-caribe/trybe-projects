import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';

import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      validName: false,
      isFetching: false,
    };

    this.MIN_NAME_LENGTH = 3;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      name: value,
      validName: value.length >= this.MIN_NAME_LENGTH,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      isFetching: true,
    });

    await createUser({ name });

    history.push('/search');
  }

  renderLoginForm() {
    const { name, validName } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          id="name"
          value={ name }
          onChange={ this.handleChange }
          data-testid="login-name-input"
        />

        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ !validName }
        >
          Entrar
        </button>
      </form>
    );
  }

  render() {
    const { isFetching } = this.state;

    return (
      <div data-testid="page-login">
        {isFetching ? <Loading /> : this.renderLoginForm()}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
