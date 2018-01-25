export default class SongLibrary {
  constructor (albums) {
    this.albums = albums
  }

  static createFromAlbums(albums) {
    return new SongLibrary(albums)
  }

  *allSongs() {
    for (let album of this.albums) {
      yield* album.tracks.map((track) => {track, album})
    }
  }
}
