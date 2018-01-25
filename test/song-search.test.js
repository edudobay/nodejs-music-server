import test from 'ava'
import appFactory from '../src/app'
import superkoa from 'superkoa'
import {inspect} from 'util'

import SongLibrary from '../src/song-library'
import songs from './songs.fixture'

function app() {
  const app = appFactory()
  app.configure({songLibrary: SongLibrary.fromTracks(songs)})
  return app
}

test('search for a song title', async t => {
  const res = await superkoa(app()).get('/songs/search?q=imagine')
  t.is(200, res.status)
  t.deepEqual(res.body, [{title: 'Imagine', artist: 'John Lennon'}])
})

test('search by title for a song that does not exist', async t => {
  const res = await superkoa(app()).get('/songs/search?q=qwerty')
  t.is(200, res.status)
  t.deepEqual(res.body, [])
})

test('search by title for a term with two results', async t => {
  const res = await superkoa(app()).get('/songs/search?q=sweet')
  t.is(200, res.status)
  t.deepEqual(res.body, [
    {title: 'My Sweet Lord', artist: 'George Harrisson'},
    {title: 'Oh! Sweet Nuthin\'', artist: 'The Velvet Underground'}
  ])
})
