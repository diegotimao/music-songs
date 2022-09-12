import React from 'react';
import { getUser } from '../services/userAPI';

import Loading from './Loading';

import Menu from './Menu';

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
            : (<Menu nameUser={ nameUser } userImage={ userImage } />)}
        </div>
      </header>
    );
  }
}

export default Header;
