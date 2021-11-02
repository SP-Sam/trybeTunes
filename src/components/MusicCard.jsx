import React, { Component } from 'react'

import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.addSongToFavs = this.addSongToFavs.bind(this);
    this.removeSongFromTheFav = this.removeSongFromTheFav.bind(this);
    this.verifyCheckbox = this.verifyCheckbox.bind(this);
  }

  addSongToFavs(songInfos) {
    const {
      loading,
      updateFavs,
    } = this.props;

    loading(true);
    addSong(songInfos).then(() => updateFavs());
  }

  removeSongFromTheFav(songInfos) {
    const {
      loading,
      updateFavs,
    } = this.props;

    loading(true);
    removeSong(songInfos).then(() => updateFavs());
  }

  verifyCheckbox({ target }) {
    const { checked, id } = target;
    const { trackList } = this.props;

    const song = trackList.find((track) => track.trackId === Number(id));

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
    const { trackList, favorites } = this.props;

    return (
      <div>
        <ol className="trackList">
          {trackList.map((track, i) => (
            i === 0
              ? ''
              : (
                <li key={ track.trackId }>
                  <span>{track.trackName}</span>
                  <audio
                    controls
                    src={ track.previewUrl }
                  >
                    <track kind="captions" />
                  </audio>

                  <label htmlFor={ track.trackId }>
                    <input
                      className="favCheck"
                      type="checkbox"
                      id={ track.trackId }
                      name={ track.trackName }
                      onChange={ this.verifyCheckbox }
                      checked={ favorites
                        .some((song) => song.trackId === track.trackId) }
                    />
                    <span>Favorita</span>
                  </label>
                </li>
              )
          ))}
        </ol>
      </div>
    )
  }
}
