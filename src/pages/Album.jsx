import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default withRouter(class Album extends Component {
  constructor() {
    super();

    this.state = {
      isLoad: true,
      trackList: [],
      favorites: [],
      artist: '',
      album: '',
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
    this.loadingScreen = this.loadingScreen.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusics();
    this.getFavorites();
  }

  getAlbumMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({
      isLoad: true,
    });

    getMusics(id).then((results) => {
      const trackList = results.map((track) => track);

      const artist = results
        .find((song) => song.artistName === trackList[0].artistName)
        .artistName;

      const album = results
        .find((song) => song.artistName === trackList[0].artistName)
        .collectionName;

      const image = results
        .find((song) => song.artistName === trackList[0].artistName)
        .artworkUrl100;

      this.setState({
        isLoad: false,
        trackList,
        artist,
        album,
        image,
      });
    });
  }

  getFavorites() {
    this.setState({
      isLoad: true,
    });

    getFavoriteSongs().then((favs) => {
      this.setState({
        isLoad: false,
        favorites: favs,
      });
    });
  }

  loadingScreen(status) {
    this.setState({ isLoad: status });
  }

  render() {
    const {
      trackList,
      artist,
      album,
      image,
      isLoad,
      favorites,
    } = this.state;

    return (
      <div className="album-page">
        {isLoad
          ? <span className="loadingAlbum"><Loading /></span>
          : (
            <div className="album-overview">
              <div className="album-exhibiton">
                <img src={ image } alt={ `${album} cover` } />
                <h1>{album}</h1>
                <p>{artist}</p>
              </div>

              <MusicCard
                trackList={ trackList }
                loading={ this.loadingScreen }
                updateFavs={ this.getFavorites }
                favorites={ [...favorites] }
              />
            </div>
          )}
      </div>
    );
  }
})
