import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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
    this.setState({
      loading: false,
    });
    console.log(responseUser);
  }

  render() {
    const {
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <strong>Carregando...</strong> : null }
      </div>
    );
  }
}

export default ProfileEdit;
