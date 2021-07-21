import log from '@lib/logger'
import { IUser } from 'Types/User'
import { error } from 'express-easy-helper'
import { initialize } from '@auth/services/session.service'
import type { Request, Response } from '@tinyhttp/app'
export function callback() {
  return async (req: Request, res: Response) => {
    const { user }: { user: IUser } = req.body
    try {
      await initialize(user, req, res)
      // res.send(user)
    } catch (err) {
      log.error('local controller', err)
      error(res, err)
    }
  }
}
