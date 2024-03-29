import { App } from '@tinyhttp/app'

import type { Request, Response } from '@tinyhttp/app'

import { environment } from '@lib/environment'
import log from '@lib/logger'
import { mongoConnect } from '@lib/mongoose'
import { config } from '@lib/config'
import { redisConnect } from '@lib/redis'
import { socketIO } from '@lib/socketIO'
import routes from '@lib/routes'
import startRabbitMQWorkers from '@lib/workers'
import { agenda } from '@lib/agenda'

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
  await agenda.start()

  const redisConn = await redisConnect()
  await socketIO.socketConnect(redisConn)
  await startRabbitMQWorkers()

  await routes(app)

  app.listen(
    environment.server.port,
    () => {
      log.success(`Running at http://${environment.server.ip}:${environment.server.port} [${environment.mode}]`)
    },
    environment.server.ip
  )
})()
