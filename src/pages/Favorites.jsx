import React, { Component } from 'react'
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favSongs: [],
      isLoad: true,
    };

    this.getFavorites = this.getFavorites.bind(this);
    this.addSongToFavs = this.addSongToFavs.bind(this);
    this.verifyCheckbox = this.verifyCheckbox.bind(this);
    this.loadingScreen = this.loadingScreen.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  addSongToFavs(songInfos) {
    this.loadingScreen(true);
    addSong(songInfos).then(() => this.getFavorites());
  }

  removeSongFromTheFav(songInfos) {
    this.loadingScreen(true);
    removeSong(songInfos).then(() => this.getFavorites());
  }

  getFavorites() {
    this.setState({
      isLoad: true,
    })

    getFavoriteSongs().then((favs) => {
      this.setState({
        favSongs: favs,
        isLoad: false,
      })
    })
  }

  loadingScreen(status) {
    this.setState({ isLoad: status });
  }

  verifyCheckbox({ target }) {
    const { checked, id } = target;
    const { favSongs } = this.state;

    const song = favSongs.find((track) => track.trackId === Number(id));

    const songInfos = {
      artistName: song.artistName,
      trackId: song.trackId,
      trackName: song.trackName,
      previewUrl: song.previewUrl,
      artworkUrl100: song.artworkUrl100,
      kind: song.kind,
    };

    if (checked) this.addSongToFavs(songInfos);
    else this.removeSongFromTheFav(songInfos);
  }

  render() {
    const { favSongs, isLoad } = this.state;

    return (
      <div className="favorites-page">
        {isLoad
          ? <div className="loading-favs"><Loading /></div>
          : (
            <div>
              {favSongs.length < 1
                ? <h1>Nenhuma música favorita</h1>
                : (
                  <div>
                    <h2>Músicas favoritas:</h2>
                    <ul className="favSongs">
                      {favSongs.map((song) => (
                        <li key={ song.trackId }>
                          <img src={song.artworkUrl100} alt={song.trackName} />
                          <span>{song.trackName}</span>
                          <audio
                            controls
                            src={ song.previewUrl }
                          >
                            <track kind="captions" />
                          </audio>
          
                          <label htmlFor={ song.trackId }>
                            <input
                              className="favCheck"
                              type="checkbox"
                              id={ song.trackId }
                              name={ song.trackName }
                              onChange={ this.verifyCheckbox }
                              checked={ favSongs
                                .some((track) => track.trackId === song.trackId) }
                            />
                            <span>Favorita</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
            </div>

          )}
      </div>
    )
  }
}
