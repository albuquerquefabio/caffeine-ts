import log from '@lib/logger'
import type { App, NextFunction, Request, Response } from '@tinyhttp/app'

import bodyParser from 'body-parser'

import helmet from 'helmet'
import { cors } from '@tinyhttp/cors'
import { environment } from '@lib/environment'
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
    app.use((req: Request, res: Response, next: NextFunction): void => {
      // show method , url, ip and timestamp
      log.info(`[${req.method}] ${req.url} ${req.ip} ${new Date().toISOString()}`, res.statusCode)
      next()
    })
}
