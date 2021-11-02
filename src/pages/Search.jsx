import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isLoading: false,
      hasSearch: false,
      albumsList: [],
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getArtistAlbuns = this.getArtistAlbuns.bind(this);
  }

  handleSearchChange({ target }) {
    const { value } = target;

    this.setState({
      search: value,
    });
  }

  getArtistAlbuns() {
    const { search } = this.state;

    this.setState({
      isLoading: true,
    });

    searchAlbumsAPI(search).then((albums) => {
      const result = albums.map((album) => ({
        collectionId: album.collectionId,
        artist: album.artistName,
        collection: album.collectionName,
        trackCount: album.trackCount,
        image: album.artworkUrl100,
      }));

      this.setState({
        isLoading: false,
        albumsList: result,
        hasSearch: true,
      });
    });
  }

  render() {
    const { search, isLoading, albumsList, hasSearch } = this.state;
    const minLength = 2;

    return (
      <div className="search">
        {isLoading
          ? <Loading />
          : (
            <div className="search-page">
              <form className="search-form">
                <input
                  type="text"
                  className="search-form-input"
                  placeholder="Nome do artista"
                  onChange={ this.handleSearchChange }
                />
                <button
                  type="button"
                  className="search-form-button"
                  onClick={ this.getArtistAlbuns }
                  disabled={ search.length < minLength }
                >
                  Procurar
                </button>
              </form>
              {hasSearch && albumsList.length > 0
                && (
                  <div className="albums">
                    <h3>
                      {`Resultado de álbuns de: ${search}`}
                    </h3>
                    <div className="albums-list">
                      {albumsList.map((result) => (
                        <Link
                          className="album"
                          key={ result.collectionId }
                          to={ `/album/${result.collectionId}` }
                        >
                          <div className="card-image">
                            <img src={ result.image } alt={ result.collection } />
                          </div>
                          <h4>{result.collection}</h4>
                          <p>{result.artist}</p>
                          <p className="track-count">
                            {`${result.trackCount} Músicas`}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              {hasSearch && albumsList.length === 0 && <h1>Nenhum álbum foi encontrado</h1>}
            </div>
          )}
      </div>
    )
  }
}
