import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addFavorites = this.addFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);

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
  }

  render() {
    const { previewUrl, name, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div data-testid="page-favorites">
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        { loading ? (
          <strong>Carregando...</strong>
        ) : (
          <label
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
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
};

export default MusicCard;
