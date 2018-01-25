import { asClass } from 'awilix'

class SongRepository {
  constructor ({songs}) {
    this.__songs = songs
  }

  searchByTitle (searchTerm) {
    return this.__songs
      .filter(s => s.title.toLowerCase().split(/\s+/)
        .some(w => w.includes(searchTerm)))
  }
}

export function configure(router, container) {

  container.register({
    songRepository: asClass(SongRepository).scoped(),
  })

  router.get('/songs/search', (ctx, next) => {
    const searchTerm = ctx.query.q

    const repo = ctx.container.resolve('songRepository')
    const results = repo.searchByTitle(searchTerm)

    ctx.body = results
  })

}
