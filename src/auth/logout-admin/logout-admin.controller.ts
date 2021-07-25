import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from '@type/request'
import { notFound, error } from 'express-easy-helper'

export const controller = {
  logout: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      const stmt = await redisDriver.destroyMultiple(params['id'])
      if (!stmt) return notFound(res)
      res.send({ stmt })
    } catch (err) {
      error(res, `${err}`)
    }
  }
}
