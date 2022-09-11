import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.profileUser = this.profileUser.bind(this);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.profileUser();
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
      description,
      email,
      image,
    });
  }

  render() {
    const {
      loading,
      name,
      email,
      image,
      description,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? null : (
          <div className="profile">
            <div className="profile-container">
              <div className="profile-banner">
                <img src="" alt="" />
              </div>
              <div className="profile-info">
                <img
                  src={ image }
                  alt="Avatar"
                  data-testid="profile-image"
                />
                <div className="profile-info-user">
                  <h1>{name}</h1>
                  <p>{ email }</p>
                  <p className="description">{ description }</p>
                </div>
                <div className="redirect">
                  <Link className="link" to="/profile/edit">Editar perfil</Link>
                </div>
              </div>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
