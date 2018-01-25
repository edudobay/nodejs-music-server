import test from 'ava'

import * as loader from '../src/album-loader'
import songLibrary from '../src/song-library'

const count = items => items.reduce((acc, x) => acc + 1, 0)
const sum = items => items.reduce((acc, x) => acc + x, 0)

test('should iterate tracks from all albums', async t => {
  const albums = await loader.readAllAlbums()
  const originalCount = sum(albums.map(a => count(a.tracks)))

  const library = songLibrary.fromAlbums(albums)
  let iteratedCount = 0
  for (let song of library.allSongs()) {
    iteratedCount++
  }

  t.is(iteratedCount, originalCount)
})
