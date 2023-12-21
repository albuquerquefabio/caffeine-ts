import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from 'src/@types/request'

export const controller = {
  logout: () => async (req: IReqUser, res: Response) => {
    const { params } = req
    try {
      const stmt = await redisDriver.destroyMultiple(params['id'])
      if (!stmt) return res.status(404).end('not found')
      res.send({ stmt })
    } catch (err) {
      res.status(500).send(String(err))
    }
  }
}
