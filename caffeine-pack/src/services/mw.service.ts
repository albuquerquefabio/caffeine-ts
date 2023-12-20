import User from '@api/user/user.model'
import { Token } from '@lib/token'
import { unauthorized, forbidden } from 'express-easy-helper'
import { has } from 'role-calc'
import type { IReqUser } from 'src/@types/request'

import type { Response, NextFunction } from '@tinyhttp/app'

export function mw(requiresRoles?: string | Array<string>) {
  return async (req: IReqUser, res: Response, next: NextFunction) => {
    // Extract Token
    const token = req.cookies['token'] || req.headers.authorization || null

    if (!token) return forbidden(res)

    try {
      // Verify Token with redis-jwt -> if you want to extract the data you should
      const session = await Token.verify(String(token), true)
      if (!session) return unauthorized(res)
      // Extract info user from MongoDB
      const _user = await User.findOne({ _id: session['id'] }).select('-social').exec()
      // If id's not equals
      if (_user._id.toString() !== String(session['id'])) return forbidden(res)
      // User is enabled?
      if (!_user.status) return unauthorized(res)

      // Verify Roles
      if (requiresRoles) if (!has(requiresRoles, _user.roles)) return forbidden(res)

      req.user = Object.assign({ session }, _user['_doc'])

      next()
    } catch (err) {
      return unauthorized(res, err)
    }
  }
}
