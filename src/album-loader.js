import fs from 'fs'
import _glob from 'glob'
import path from 'path'
import yaml from 'js-yaml'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const glob = promisify(_glob)

const albumsDir = path.join(__dirname, '../data/albums')

async function readFileYaml(filename, options) {
  return yaml.safeLoad(await readFile(filename, options))
}

function readAlbumTrack(data, defaults) {
  return {
    title: data.title,
    artist: data.artist || defaults.artist,
    length: data.length
  }
}

function readAlbum(data) {
  const defaults = {artist: data.artist}
  const tracks = data.tracks.map(t => readAlbumTrack(t, defaults))
  return {title: data.title, artist: data.artist, tracks: tracks}
}

export async function readAlbumFromFile(filename, options) {
  return readAlbum(await readFileYaml(filename, options))
}

export async function readAllAlbums() {
  const files = await glob('*.yaml', {cwd: albumsDir})
  return await Promise.all(
    files.map(f => readAlbumFromFile(path.join(albumsDir, f))))
}
