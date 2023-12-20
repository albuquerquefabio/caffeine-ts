import log from '@lib/logger'
import type { IUserDocument } from 'src/@types/user'
import { initialize } from '@services/session.service'
import type { Request, Response } from '@tinyhttp/app'
export function callback() {
  return async (req: Request, res: Response) => {
    const { user }: { user: IUserDocument } = req.body
    try {
      await initialize(user, req, res)
    } catch (err) {
      log.error('local controller', err)
      res.status(500).send(String(err))
    }
  }
}
