import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.userName = this.userName.bind(this);

    this.state = {
      nameUser: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState(() => ({
      loading: true,
    }));

    const user = await getUser();

    if (user) {
      this.setState(() => ({
        nameUser: user.name,
        loading: false,
      }));
    }
  }

  render() {
    const { loading, nameUser } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : (
            <>
              <p data-testid="header-user-name">{ nameUser }</p>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </>
          )}
      </header>
    );
  }
}

export default Header;
