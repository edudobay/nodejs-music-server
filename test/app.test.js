import test from 'ava'
import app from '../src/app'
import superkoa from 'superkoa'

test('app works', async t => {
  const res = await superkoa(app).get('/')
  t.is(200, res.status)
  const {message} = res.body
  t.is(message, 'Hello world')
})
