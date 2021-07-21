// import log from '@lib/logger'
import authRouters from '@auth/routers'
import type { App } from '@tinyhttp/app'
import routers from '@routers/index'
// import safe from 'safe-regex'
// import { forbidden } from 'express-easy-helper'

export default async function routes(app: App): Promise<void> {
  // app.all('*', (req, res, next) => {
  //   const { params, query } = req
  //   log.debug('params', Object.values(params).join())
  //   log.debug('query', Object.values(query).join())
  //   const paramsStr = Object.values(params).join()
  //   const queryStr = Object.values(query).join()
  //   if (safe(paramsStr)) return forbidden(res, 'params invalid or incorrect.')
  //   if (safe(queryStr)) return forbidden(res, 'query invalid or incorrect.')
  //   next()
  // })

  await routers(app)
  await authRouters(app)

  app.get('/', async (_, res) => {
    try {
      res.send(`
        <h1 style="width: 100%; text-align: center;">Caffeine works! ☕</h1>
      `)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  app.post('/', async (req, res) => {
    try {
      res.send({ hello: 'world', your_body: req.body })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}
