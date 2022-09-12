import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

// import { Container } from './styles';

class Menu extends React.Component {
  render() {
    const { nameUser, userImage } = this.props;

    return (
      <div className="menu">
        <div className="menu-user">
          <div className="logo">
            <img src={ Logo } alt="Logo icon" />
          </div>
          <div className="user">
            <p data-testid="header-user-name">{ nameUser }</p>
            { userImage && <img src={ userImage } alt="User avatar" /> }
          </div>
        </div>
        <div className="menu-links">
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
      </div>
    );
  }
}

export default Menu;

Menu.propTypes = {
  nameUser: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
};
