import { App } from '@tinyhttp/app'

import type { Request, Response } from '@tinyhttp/app'

import environment from '@env/index'
import log from '@lib/logger'
import { mongoConnect } from '@lib/mongoose'
import { config } from '@lib/config'
import { redisConnect } from '@lib/redis'

const app = new App({
  noMatchHandler: (req: Request, res: Response): void => {
    res.status(404).end('Not found :(')
  },
  onError: (err, req, res) => {
    res.status(500).send({
      message: err.message || err
    })
  },
  settings: {
    networkExtensions: true
  }
})

;(async function run() {
  log.trace('Loading...')

  await config(app)
  await redisConnect()

  app.get('/', function handler(_, res) {
    res.send('<h1>Hello World</h1>')
  })
  app.post('/', function handler(req, res) {
    const { lorem } = req.body
    res.send(`<pre>${req.body}</pre><h1>${lorem}</h1>`)
  })
  app.listen(
    environment.server.port,
    () => {
      log.success(`Running at http://${environment.server.ip}:${environment.server.port} [${environment.mode}]`)
    },
    environment.server.ip
  )
})()
