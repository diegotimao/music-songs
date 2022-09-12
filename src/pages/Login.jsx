import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Logo from '../assets/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.habiliteButton = this.habiliteButton.bind(this);

    this.state = {
      nameUser: '',
      loading: false,
      isButtonDisable: true,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    this.habiliteButton(value);
  }

  async handleSubmit() {
    const { nameUser } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name: nameUser, image: 'http://cdn.onlinewebfonts.com/svg/img_569204.png' });

    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  habiliteButton(value) {
    const maxValue = 3;
    if (value.length >= maxValue) {
      this.setState(() => ({
        isButtonDisable: false,
      }));
    } else {
      this.setState(() => ({
        isButtonDisable: true,
      }));
    }
  }

  render() {
    const { nameUser, loading, isButtonDisable } = this.state;

    return (
      <div className="login" data-testid="page-login">
        { loading ? <Loading />
          : (
            <div className="login-container">
              <div className="login-content">
                <div className="login-info">
                  <img src={ Logo } alt="Logo icon" />
                  <h1>Trybetunes</h1>
                </div>
                <div className="login-form">
                  <div className="login-header">
                    <h1>Login</h1>
                    <p>
                      Entre com seu username e divirta-se com seus cantores favoritos
                    </p>
                  </div>
                  <div className="formulario-login">

                    <input
                      placeholder="Digite seu username"
                      className="input-login"
                      type="text"
                      name="nameUser"
                      value={ nameUser }
                      onChange={ this.handleChange }
                      data-testid="login-name-input"
                    />

                    <button
                      className="btn"
                      type="submit"
                      data-testid="login-submit-button"
                      disabled={ isButtonDisable }
                      onClick={ this.handleSubmit }
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
