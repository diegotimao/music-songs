import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends React.Component {
  render() {
    const { albums } = this.props;

    return (
      <div className="container">
        <div className="albums">
          {albums.map((item) => (
            <div key={ item.collectionId } className="card-album">
              <img className="image" src={ item.artworkUrl100 } alt="" />
              <p>{ item.collectionName }</p>
              <strong>{ item.artistName }</strong>
              <Link
                data-testid={ `link-to-album-${item.collectionId}` }
                to={ `/album/${item.collectionId}` }
              >
                Ver album
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf.isRequired,
};

export default Albums;
