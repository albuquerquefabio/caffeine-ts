import type { App } from '@tinyhttp/app'
import routers from '@routers/index'

export default async function routes(app: App): Promise<void> {
  await routers(app)

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
