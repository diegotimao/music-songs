import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      musicFavorits: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getMusicFavorits();
  }

  getMusicFavorits = async () => {
    this.setState({
      loading: true,
    });
    const responseFavorites = await getFavoriteSongs();
    this.setState({
      musicFavorits: responseFavorites[0],
      loading: false,
    });
  }

  render() {
    const {
      loading,
      musicFavorits,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-container">
          <div className="favorites-content">
            { loading ? null : (
              musicFavorits.map((item) => (
                <MusicCard
                  key={ item.trackName }
                  previewUrl={ item.previewUrl }
                  name={ item.trackName }
                  trackId={ item.trackId }
                  result={ musicFavorits }
                />
              ))
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
