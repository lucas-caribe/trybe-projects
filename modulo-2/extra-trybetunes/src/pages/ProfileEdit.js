import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: { value, isValid: !!value.length },
    });
  }

  handleEmail({ target: { value } }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const validEmail = emailRegex.test(value);

    this.setState({
      email: { value, isValid: validEmail },
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { history } = this.props;
    const { name, email, description, image } = this.state;

    this.setState({ isFetching: true });

    await updateUser({
      name: name.value,
      email: email.value,
      description: description.value,
      image: image.value,
    });

    history.push('/profile');
  }

  async fetchUser() {
    this.setState({ isFetching: true });

    const { name, email, description, image } = await getUser();

    this.setState({
      name: { value: name, isValid: !!name.length },
      email: { value: email, isValid: !!email.length },
      description: { value: description, isValid: !!description },
      image: { value: image, isValid: !!image.length },
      isFetching: false,
    });
  }

  renderEditForm() {
    const { name, email, description, image } = this.state;
    const { isValid } = { ...name, ...email, ...description, ...image };

    return (
      <form onSubmit={ this.handleSubmit }>
        <Input
          id="edit-input-name"
          name="name"
          labelText="Name"
          value={ name.value }
          onChange={ this.handleChange }
        />

        <Input
          id="edit-input-email"
          name="email"
          labelText="Email"
          value={ email.value }
          onChange={ this.handleEmail }
        />

        <TextArea
          id="edit-input-description"
          name="description"
          labelText="Description"
          value={ description.value }
          onChange={ this.handleChange }
        />

        <Input
          id="edit-input-image"
          name="image"
          labelText="Image"
          value={ image.value }
          onChange={ this.handleChange }
        />

        <button
          disabled={ !isValid }
          data-testid="edit-button-save"
          type="submit"
        >
          Save
        </button>
      </form>
    );
  }

  render() {
    const { isFetching } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {isFetching ? <Loading /> : this.renderEditForm()}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
