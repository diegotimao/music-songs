import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from './Loading';
import Logo from '../assets/logo.png';

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
        userImage: user.image,
        loading: false,
      }));
    }
  }

  render() {
    const { loading, nameUser, userImage } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="header-content">
          { loading ? <Loading />
            : (
              <>
                <div className="logo">
                  <img src={ Logo } alt="Logo icon" />
                </div>
                <div className="links">
                  <Link
                    to="/search"
                    data-testid="link-to-search"
                    className="link-item"
                  >
                    Pesquisar
                  </Link>
                  <Link
                    to="/favorites"
                    data-testid="link-to-favorites"
                    className="link-item"
                  >
                    Favoritas
                  </Link>
                  <Link
                    to="/profile"
                    data-testid="link-to-profile"
                    className="link-item"
                  >
                    Perfil
                  </Link>
                </div>
                <div className="user">
                  <p data-testid="header-user-name">{ nameUser }</p>
                  { userImage && <img src={ userImage } alt="User avatar" /> }
                </div>
              </>
            )}
        </div>
      </header>
    );
  }
}

export default Header;
