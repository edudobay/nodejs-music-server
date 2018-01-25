import appFactory from './app'

// TODO: Import from other sources or leave this as a setting
import songs from '../test/songs.fixture'

const app = appFactory()
app.configure({songs: songs})
app.listen(3000)
