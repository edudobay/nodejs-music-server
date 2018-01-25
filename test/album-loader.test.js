import test from 'ava'

import * as loader from '../src/album-loader'

test('should load all albums', async t => {
  const albums = await loader.readAllAlbums()
  t.is(albums.length, 2)
})
