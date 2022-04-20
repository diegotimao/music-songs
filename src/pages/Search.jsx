import React from 'react';
import Albums from '../components/Albuns';
import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            value={ search }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isButtonDisable }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { loading && (
          <Loading />
        )}
        { !loading && resultArtist && (
          <>
            <strong>
              Resultado de álbuns de:
              {' '}
              { valueSearch }
            </strong>
            <Albums albums={ albums } />
          </>
        )}
        { albumErro ? <p>Nenhum álbum foi encontrado</p> : null }
      </div>
    );
  }
}

export default Search;
