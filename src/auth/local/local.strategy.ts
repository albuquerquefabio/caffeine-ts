import log from '@lib/logger'
import User from '@models/User/user.model'
import { unauthorized } from 'express-easy-helper'

import type { Request, Response, NextFunction } from '@tinyhttp/app'

export default function LocalStrategy() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: { username: string; password: string } = req.body

    try {
      const user = await User.findByUsername(username)
      if (!user) {
        return unauthorized(res, { msg: 'Username incorrect' })
      }
      const pass = await user.checkPassword(password)
      if (!pass) {
        return unauthorized(res, { msg: 'Password incorrect' })
      }

      const login = await User.loginByLocal(username, password)
      req.body.user = login
      next()
    } catch (error) {
      log.error('login local', error)
      next()
    }
  }
}
