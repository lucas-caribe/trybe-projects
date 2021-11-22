import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/Input';

import { setEmail as setEmailAction } from '../../actions/index';

import './style.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail({ target }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const validEmail = emailRegex.test(target.value);

    this.setState({
      email: target.value,
      validEmail,
    });
  }

  handlePassword({ target: { value } }) {
    const MIN_PASSWORD_LENGTH = 6;
    const validPassword = value.length >= MIN_PASSWORD_LENGTH;

    this.setState({
      password: value,
      validPassword,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { history, setEmail } = this.props;
    const { email } = this.state;

    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;

    return (
      <form className="login-section">
        <Input
          placeholder="email@exemplo.com"
          type="email"
          name="email"
          id="email"
          testId="email-input"
          value={ email }
          onChange={ this.handleEmail }
        />

        <Input
          placeholder="senha"
          type="password"
          name="password"
          id="password"
          testId="password-input"
          value={ password }
          onChange={ this.handlePassword }
        />

        <button
          disabled={ !validEmail || !validPassword }
          type="submit"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
