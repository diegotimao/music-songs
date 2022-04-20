import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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

    await createUser({ name: nameUser });

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
            <>
              <h1>Login</h1>
              <label htmlFor="nameUser">
                <input
                  type="text"
                  name="nameUser"
                  value={ nameUser }
                  onChange={ this.handleChange }
                  data-testid="login-name-input"
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ isButtonDisable }
                onClick={ this.handleSubmit }
              >
                Entrar
              </button>
            </>
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
