import log from '@lib/logger'
import type { App } from '@tinyhttp/app'

import { logger } from '@tinyhttp/logger'
import bodyParser from 'body-parser'

import helmet from 'helmet'
import { cors } from '@tinyhttp/cors'
import environment from '@env/index'
import cookieParser from 'cookie-parser'

export async function config(app: App): Promise<void> {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  app
    .use(bodyParser.json({ limit: '5mb' }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser(environment.secret))
    // for gzip compression you should use Nginx
    .use(helmet())
    .use(
      cors({
        origin: true,
        methods,
        credentials: true
      })
    )

  // TODO SESSION LOGIN
  !environment.log ||
    app.use(
      logger({
        ip: true,
        methods,
        timestamp: { format: 'MM-DD-YY HH:mm:ss Z' },
        output: { callback: log.info, color: true }
      })
    )
}
