import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.profileUser = this.profileUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);

    this.state = {
      loading: false,
      isValidButton: true,
    };
  }

  componentDidMount() {
    this.profileUser();
    this.validateButton();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
    this.validateButton();
  }

  async handleClick(e) {
    e.preventDefault();
    const { history } = this.props;
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    this.setState({
      loading: true,
    });

    await updateUser({
      name,
      email,
      description,
      image,
    });

    this.setState({
      loading: false,
    });
    history.push('/profile');
  }

  async profileUser() {
    this.setState({
      loading: true,
    });

    const responseUser = await getUser();
    const { name, email, description, image } = responseUser;

    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
  }

  validateButton() {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    const data = [name, email, description, image];
    const isValid = data.every((item) => item !== '' && item !== undefined);

    if (!isValid) {
      this.setState({
        isValidButton: true,
      });
    } else {
      this.setState({
        isValidButton: false,
      });
    }
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      isValidButton,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? null : (
          <div className="profile">
            <div className="profile-container">
              <form action="" className="formulario-edit">
                <h1>Editar perfil</h1>
                <label htmlFor="name">
                  Username
                  <input
                    type="text"
                    name="name"
                    value={ name }
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={ email }
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <input
                    type="textarea"
                    name="description"
                    value={ description }
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="image">
                  Url da imagem
                  <input
                    type="text"
                    name="image"
                    value={ image }
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                  />
                </label>
                <div className="submit-button">
                  <p>Preencha os dados com atenção</p>
                  <button
                    type="submit"
                    data-testid="edit-button-save"
                    disabled={ isValidButton }
                    onClick={ this.handleClick }
                  >
                    Editar perfil
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
