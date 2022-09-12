import React from 'react';
import Albums from '../components/Albuns';
import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Banner from '../assets/banner.png';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.habiliteButton = this.habiliteButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      search: '',
      isButtonDisable: true,
      loading: false,
      resultArtist: false,
      valueSearch: '',
      albums: '',
      albumErro: false,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    this.habiliteButton(value);
  }

  async handleClick() {
    const { search } = this.state;

    this.setState(() => ({
      loading: true,
      valueSearch: search,
    }));
    const result = await searchAlbumsAPI(search);

    if (result.length === 0) {
      this.setState({
        albumErro: true,
        loading: false,
      });
    } else {
      this.setState(() => ({
        search: '',
        loading: false,
        resultArtist: true,
        albums: result,
      }));
    }
  }

  habiliteButton(value) {
    if (value.length >= 2) {
      this.setState(() => ({
        isButtonDisable: false,
      }));
    } else {
      this.setState(() => ({
        isButtonDisable: true,
      }));
    }
  }

  render() {
    const {
      search,
      isButtonDisable,
      loading,
      resultArtist,
      valueSearch,
      albums,
      albumErro,
    } = this.state;

    return (
      <div className="search" data-testid="page-search">
        <Header />
        <div className="form">
          <div className="form-content">
            <div className="response">
              { !loading && resultArtist && !albumErro && (
                <strong>
                  Resultado de álbuns de:
                  {' '}
                  { valueSearch }
                </strong>
              )}
              { albumErro ? <p>Nenhum álbum foi encontrado</p> : null }
            </div>
            <div className="search-loading">
              { loading && (
                <Loading />
              )}
            </div>
            <div className="search-content">
              <input
                type="text"
                name="search"
                value={ search }
                placeholder="Pesquise por um artista ou banda"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ isButtonDisable }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
          </div>
          {!albums && (
            <div className="search-result">
              <div className="seach-info">
                <img src={ Banner } alt="Banner" />
              </div>
            </div>
          )}
        </div>
        { !loading && resultArtist && (
          <div className="content-response">
            <div className="response-album">
              <Albums albums={ albums } />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
