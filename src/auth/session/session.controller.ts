import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from '@type/request'
import { notFound, error } from 'express-easy-helper'

export const controller = {
  list: () => async (req: IReqUser, res: Response) => {
    const { user } = req
    try {
      let items = await redisDriver.getValuesByPattern(user._id)
      if (!items || !items.length) return notFound(res)

      items = items.map((el) => JSON.parse(el))
      res.send(items)
    } catch (err) {
      error(res, `${err}`)
    }
  },
  destroy: () => async (req: IReqUser, res: Response) => {
    const { user, params } = req
    try {
      const query = `${user._id}:${params['id'].split(':')[1]}`
      const stmt = await redisDriver.destroy(query)
      if (!stmt) return notFound(res)
      res.send('done')
    } catch (err) {
      error(res, `${err}`)
    }
  }
}
