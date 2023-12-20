import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from 'src/@types/request'

export const controller = {
  list: () => async (req: IReqUser, res: Response) => {
    const { user } = req
    try {
      let items = await redisDriver.getValuesByPattern(user._id)
      if (!items || !items.length) return res.status(404).end('not found')

      items = items.map((el) => JSON.parse(el))
      res.send(items)
    } catch (err) {
      res.status(500).send(String(err))
    }
  },
  destroy: () => async (req: IReqUser, res: Response) => {
    const { user, params } = req
    try {
      const query = `${user._id}:${params['id'].split(':')[1]}`
      const stmt = await redisDriver.destroy(query)
      if (!stmt) return res.status(404).end('not found')
      res.send('done')
    } catch (err) {
      res.status(500).send(String(err))
    }
  }
}
