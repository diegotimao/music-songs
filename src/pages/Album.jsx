import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

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

    this.setState(() => ({
      musics,
      nameArtist: infoAlbum[0].artistName,
      nameAlbum: infoAlbum[0].collectionName,
      loading: false,
    }));
  }

  render() {
    const { musics, nameArtist, nameAlbum, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <>
            <p data-testid="artist-name">
              { nameArtist }
            </p>
            <p data-testid="album-name">
              { nameAlbum }
            </p>
            {
              musics.map((item) => (
                <MusicCard
                  key={ item.trackName }
                  previewUrl={ item.previewUrl }
                  name={ item.trackName }
                />
              ))
            }
          </>
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
