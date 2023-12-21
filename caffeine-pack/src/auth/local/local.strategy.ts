import log from '@lib/logger'
import User from '@api/user/user.model'

import type { Request, Response, NextFunction } from '@tinyhttp/app'

export default function LocalStrategy() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: { username: string; password: string } = req.body

    try {
      const user = await User.findByUsername(username)
      if (!user) {
        return res.status(401).send('Invalid username or password')
      }
      const pass = await user.checkPassword(password)
      if (!pass) {
        return res.status(401).send('Invalid username or password')
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
