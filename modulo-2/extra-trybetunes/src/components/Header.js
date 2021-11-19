import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isFetching: false,
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.renderHeaderContent = this.renderHeaderContent.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({ isFetching: true });

    const user = await getUser();

    this.setState({
      user,
      isFetching: false,
    });
  }

  renderHeaderContent() {
    const { user } = this.state;

    return (
      <>
        <p data-testid="header-user-name">{user.name}</p>
        <nav>
          <Link data-testid="link-to-search" to="/search">
            Pesquisa
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favoritas
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Perfil
          </Link>
        </nav>
      </>
    );
  }

  render() {
    const { isFetching } = this.state;

    return (
      <header data-testid="header-component">
        {isFetching ? <Loading /> : this.renderHeaderContent()}
      </header>
    );
  }
}

export default Header;
