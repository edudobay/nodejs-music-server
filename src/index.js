import appFactory from './app'
import * as loader from './album-loader'
import SongLibrary from './song-library'

function addAlbums(app) {
  return (albums) => {
    const library = SongLibrary.fromAlbums(albums)
    app.configure({songLibrary: library})
  }
}

const app = appFactory()

loader.readAllAlbums()
  .then(addAlbums(app))
  .then(() => app.listen(3000))
