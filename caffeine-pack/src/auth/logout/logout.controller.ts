import { redisDriver } from '@lib/redis-driver/index'
import type { Response } from '@tinyhttp/app'
import type { IReqUser } from 'src/@types/request'

export const controller = {
  logout: () => async (req: IReqUser, res: Response) => {
    const { user } = req
    try {
      const query = `${user.session.rjwt}`
      const stmt = await redisDriver.destroy(query)
      if (!stmt) return res.status(404).end('not found')
      res.send('done')
    } catch (err) {
      res.status(500).send(String(err))
    }
  }
}
