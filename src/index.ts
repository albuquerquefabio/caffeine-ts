import { App } from '@tinyhttp/app'
import config from 'environment'

import logger from 'lib/logger'
import { mongoConnect } from 'lib/mongoose'

const app = new App()

;(async function run() {
  logger.trace('Loading...')

  app.get('/', function handler(_, res) {
    res.send('<h1>Hello World</h1>')
  })
  await mongoConnect()

  app.listen(
    config.server.port,
    () => {
      logger.success(`Running at http://${config.server.ip}:${config.server.port} [${config.mode}]`)
    },
    config.server.ip
  )
})()
