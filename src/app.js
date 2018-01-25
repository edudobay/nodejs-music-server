import Koa from 'koa'
import Router from 'koa-router'
import { createContainer, asClass, asFunction } from 'awilix'

import * as songs from './songs'
import * as songLibrary from './song-library'

const modules = [songs, songLibrary]

class Configuration {
  constructor () {
    this.settings = {}
    this.configured = false
  }

  configure (newSettings) {
    if (this.configured) {
      throw new Error('Application already configured')
    }

    this.settings = {...newSettings}
    this.configured = true
  }
}

function appFactory() {
  const app = new Koa()
  const router = new Router()

  const _ = new Configuration()
  app.configure = (newSettings) => _.configure(newSettings)

  const container = createContainer()
  container.register({
    songLibrary: asFunction(() => _.settings.songLibrary).scoped(),
  })

  modules.forEach(m => m.configure(router, container))

  app.context.container = container
  app
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}

export default appFactory
