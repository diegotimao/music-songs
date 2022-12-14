import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addFavorites = this.addFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.removeFavorits = this.removeFavorits.bind(this);

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    const responseFavorets = await getFavoriteSongs();
    this.setState(() => ({
      musics: responseFavorets,
    }));

    const { musics } = this.state;
    const { trackId } = this.props;
    const musicFavorits = musics.some((item) => item.trackId === trackId);

    if (musicFavorits === true) {
      this.setState({
        isChecked: true,
      });
    }
  }

  async removeFavorits() {
    const { trackId } = this.props;
    const music = await getMusics(trackId);
    removeSong(music[0]);
  }

  addFavorites({ target }) {
    const value = target.checked;
    this.setState({
      loading: true,
      isChecked: value,
    }, async () => {
      const { result } = this.props;
      await addSong(result);
      this.setState({ loading: false });
    });
    this.removeFavorits();
  }

  render() {
    const { previewUrl, name, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div data-testid="page-favorites" className="music-card">
        <div className="name-artista">
          <p>{ name }</p>
        </div>
        <div className="audio-music">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <div className="favorite-soung">
          { loading ? (
            <strong>Carregando...</strong>
          ) : (
            <label
              className="favorite-label"
              htmlFor="checkbox"
            >
              Favorita
              <input
                type="checkbox"
                name="checkbox"
                checked={ isChecked }
                onChange={ this.addFavorites }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  result: PropTypes.objectOf.isRequired,
};

export default MusicCard;
