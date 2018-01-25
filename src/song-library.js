import { asFunction } from 'awilix'

export default {
  fromAlbums: (albums) => new SongLibraryFromAlbums(albums),
  fromTracks: (tracks) => new SongLibraryFromTracks(tracks),
}

class SongLibraryFromAlbums {
  constructor (albums) {
    this.albums = albums
  }

  *allSongs() {
    for (let album of this.albums) {
      yield* album.tracks.map(track => ({track, album}))
    }
  }
}

class SongLibraryFromTracks {
  constructor (tracks) {
    this.tracks = tracks
  }

  *allSongs() {
    yield* this.tracks.map(track => ({track, album: null}))
  }
}

function songInformation(track, album) {
  if (!album) return {...track}
  let {title, artist} = album
  return {...track, album: {title, artist}}
}

export function configure(router, container) {

  const getAllSongs = ({songLibrary: library}) =>
    Array.from(library.allSongs())
      .map(({track, album}) => songInformation(track, album))

  container.register({
    songs: asFunction(getAllSongs).scoped(),
  })

}
