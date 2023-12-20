import User from '@api/user/user.model'
import { Token } from '@lib/token'
import { has } from 'role-calc'
import type { IReqUser } from 'src/@types/request'

import type { Response, NextFunction } from '@tinyhttp/app'

export function mw(requiresRoles?: string | Array<string>) {
  return async (req: IReqUser, res: Response, next: NextFunction) => {
    // Extract Token
    const token = req.cookies['token'] || req.headers.authorization || null

    if (!token) return res.status(403).send('No token provided')

    try {
      // Verify Token with redis-jwt -> if you want to extract the data you should
      const session = await Token.verify(String(token), true)
      if (!session) return res.status(401).send('Invalid token')
      // Extract info user from MongoDB
      const _user = await User.findOne({ _id: session['id'] }).select('-social').exec()
      // If id's not equals
      if (_user._id.toString() !== String(session['id'])) return res.status(401).send('Invalid token')
      // User is enabled?
      if (!_user.status) return res.status(401).send('User is disabled')

      // Verify Roles
      if (requiresRoles) if (!has(requiresRoles, _user.roles)) return res.status(401).send('Invalid token')

      req.user = Object.assign({ session }, _user['_doc'])

      next()
    } catch (err) {
      return res.status(401).send('Invalid token')
    }
  }
}
