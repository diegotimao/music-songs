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
      // infoAlbum: '',
      musics: [],
      nameArtist: '',
      // nameAlbum: '',
    };
  }

  componentDidMount() {
    this.searchMusic();
  }

  async searchMusic() {
    const { match } = this.props;
    const { id } = match.params;

    const result = await getMusics(id);
    // const infoAlbum = result[0];
    const musics = result.filter((item) => item.wrapperType === 'track');
    const nameArtist = musics[0].artistName;
    // const nameAlbum = musics[0].collectionName;

    this.setState(() => ({
      musics,
      nameArtist,
    }));
  }

  render() {
    const { musics, nameArtist } = this.state;
    // console.log(nameArtist, nameAlbum);
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
         { nameArtist }
        </p>
        { musics.map((item) => (
          <MusicCard key={ item.wrapperType } item={ item.wrapperType } />
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