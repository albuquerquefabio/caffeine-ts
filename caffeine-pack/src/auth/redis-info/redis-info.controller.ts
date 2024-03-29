import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from 'src/@types/request'

export const controller = {
  dbSize: () => async (_req: IReqUser, res: Response) => {
    try {
      const size = await redisDriver.dbSize()
      res.send({ size })
    } catch (err) {
      res.status(500).send(String(err))
    }
  },
  section: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      const query = `${params['section'] || ''}`
      const stmt = query.toLowerCase() === 'ping' ? await redisDriver.ping() : await redisDriver.getInfo()
      res.send(stmt)
    } catch (err) {
      res.status(500).send(String(err))
    }
  }
}
