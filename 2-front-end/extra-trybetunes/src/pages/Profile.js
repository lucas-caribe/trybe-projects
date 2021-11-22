import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isFetching: true,
    };

    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({ isFetching: true });

    const user = await getUser();

    this.setState({
      isFetching: false,
      user,
    });
  }

  renderUserInfo() {
    const { user } = this.state;
    const { name, email, description, image } = user;

    return (
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }

  render() {
    const { isFetching } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {isFetching ? <Loading /> : this.renderUserInfo()}
        </div>
      </>
    );
  }
}

export default Profile;
