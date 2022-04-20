import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.searchMusic = this.searchMusic.bind(this);

    this.state = {
      infoAlbum: '',
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      loading: false, /* Crie um novo state aqui para loading */
    };
  }

  componentDidMount() {
    this.searchMusic();
  }

  async searchMusic() {
    const { match } = this.props;
    const { id } = match.params;

    const result = await getMusics(id);
    const infoAlbum = result[0];
    const musics = result.filter((item) => item.wrapperType === 'track');
    const nameArtist = musics[0].artistName;
    const nameAlbum = musics[0].collectionName;

    this.setState(() => ({
      musics,
      nameArtist,
      nameAlbum,
      infoAlbum,
      loading: true, /* Coloquei aqui como true */
    }));
  }

  render() {
    const { musics, nameArtist, nameAlbum, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          { nameArtist }
        </p>
        <p data-testid="album-name">
          { nameAlbum }
        </p>
        {/* no primeiro render nao existe nada em music e loading e false entao passa reto, n
            no segundo render ja existe algo no musics e o loading e true, agora vai funcionar */}
        {loading && musics.map((item) => (
          <MusicCard key={ item.wrapperType } previewUrl={ item.previewUrl } />
        ))}
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
