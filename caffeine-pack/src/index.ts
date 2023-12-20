import { App } from '@tinyhttp/app'

import type { Request, Response } from '@tinyhttp/app'

import environment from '@env/index'
import log from '@lib/logger'
import { mongoConnect } from '@lib/mongoose'
import { config } from '@lib/config'
import { redisConnect } from '@lib/redis'
import { socketConnect } from '@lib/socketIO'
import routes from '@lib/routes'

const app = new App({
  noMatchHandler: (_req: Request, res: Response): void => {
    res.status(404).end('Not found :(')
  },
  onError: (err, _req, res) => {
    res.status(500).send({
      message: err.message || err
    })
  },
  settings: {
    networkExtensions: true,
    xPoweredBy: 'Caffeine'
  }
})

;(async function run() {
  log.trace('Loading...')

  await config(app)
  await mongoConnect()
  await socketConnect(await redisConnect())

  await routes(app)

  app.listen(
    environment.server.port,
    () => {
      log.success(`Running at http://${environment.server.ip}:${environment.server.port} [${environment.mode}]`)
    },
    environment.server.ip
  )
})()
