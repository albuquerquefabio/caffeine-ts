import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from 'src/@types/request'
import { notFound, error } from 'express-easy-helper'

export const controller = {
  list: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      let items = await redisDriver.getValuesByPattern(params['id'])
      if (!items || !items.length) return notFound(res)

      items = items.map((el) => JSON.parse(el))
      res.send(items)
    } catch (err) {
      error(res, `${err}`)
    }
  },
  destroy: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      const query = `${params['id']}`
      const stmt = await redisDriver.destroyMultiple(query)
      if (!stmt) return notFound(res)
      res.send('done')
    } catch (err) {
      error(res, `${err}`)
    }
  }
}
