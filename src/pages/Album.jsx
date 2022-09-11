import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.searchMusic = this.searchMusic.bind(this);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.searchMusic();
  }

  async searchMusic() {
    const { match } = this.props;
    const { id } = match.params;

    const result = await getMusics(id);
    const musics = result.filter((item) => item.kind === 'song');
    const infoAlbum = result;
    this.setState({
      musics,
      nameArtist: infoAlbum[0].artistName,
      nameAlbum: infoAlbum[0].collectionName,
      artworkUrl100: infoAlbum[0].artworkUrl100,
      loading: false,
      result,
    });
  }

  render() {
    const {
      musics,
      nameArtist,
      nameAlbum,
      loading,
      result,
      artworkUrl100,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? null : (
          <div className="music-container">
            <div className="music-content">
              <div className="banner">
                <img src={ artworkUrl100 } alt="Capa album" />
              </div>
              <div className="card">
                <h1 data-testid="artist-name" className="item">
                  { nameArtist }
                </h1>
                <p data-testid="album-name" className="item">
                  { nameAlbum }
                </p>
                <div className="card-music">
                  {
                    musics.map((item) => (
                      <MusicCard
                        key={ item.trackName }
                        previewUrl={ item.previewUrl }
                        name={ item.trackName }
                        trackId={ item.trackId }
                        result={ result }
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
