import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';

class Favorites extends React.Component {
  constructor() {
    super();

    this.getFavorits = this.getFavorits.bind(this);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorits();
  }

  async getFavorits() {
    this.setState({
      loading: true,
    });
    const responseFavorits = await getFavoriteSongs();
    this.setState({
      loading: false,
      result: responseFavorits,
      musics: responseFavorits,
    });
  }

  render() {
    const {
      loading,
      musics,
      result,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <strong>Carregando</strong> : (
          musics.map((item) => (
            <MusicCard
              key={ item.trackName }
              previewUrl={ item.previewUrl }
              name={ item.trackName }
              trackId={ item.trackId }
              result={ result }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
