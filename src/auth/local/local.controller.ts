import log from '@lib/logger'
import type { IUserDocument } from '@types/User'
import { error } from 'express-easy-helper'
import { initialize } from '@services/session.service'
import type { Request, Response } from '@tinyhttp/app'
export function callback() {
  return async (req: Request, res: Response) => {
    const { user }: { user: IUserDocument } = req.body
    try {
      await initialize(user, req, res)
      // res.send(user)
    } catch (err) {
      log.error('local controller', err)
      error(res, err)
    }
  }
}
