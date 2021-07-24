import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from '@types/Req'
import { error } from 'express-easy-helper'

export const controller = {
  dbSize: () => async (req: IReqUser, res: Response) => {
    try {
      const size = await redisDriver.dbSize()
      res.send({ size })
    } catch (err) {
      error(res, `${err}`)
    }
  },
  section: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      const query = `${params['section'] || ''}`
      const stmt = query.toLowerCase() === 'ping' ? await redisDriver.ping() : await redisDriver.getInfo()
      res.send(stmt)
    } catch (err) {
      error(res, `${err}`)
    }
  }
}
