import { Token } from '@lib/token'
import { IDataSession } from 'src/@types/jwt'
import { environment } from '@lib/environment'
import { calc, time } from 'role-calc'
import type { Request, Response } from '@tinyhttp/app'
import type { IUserDocument } from 'src/@types/user'
import log from '@lib/logger'
import ms from 'ms'

export async function initialize(user: IUserDocument, req: Request, res: Response) {
  try {
    if (!user) return res.status(500).send({ message: 'Something wrong, please try again.' })

    // calculate ttl by user, default takes the role with the longest 'max'
    const ttl = +ms(calc(time(environment.roles, user.roles), 'max')) / 1000
    // Get user connection info to save as private on Redis
    const dataSession: IDataSession = {
      ip: req.ip || req.connection.remoteAddress || req.headers.forwarded,
      agent: String(req.headers['user-agent']),
      date: new Date().toISOString()
    }
    // All data will travel with the token
    const dataToken = {
      msg: 'hello world'
    }
    // Create token
    const token = await Token.create(user._id.toString(), {
      ttl,
      // Save data in Redis (Private content)
      dataSession,
      // Save data in token (Public content)
      dataToken
    })
    // save token in cookies
    res.cookie('token', token)
    // if local return token
    if (user.provider === 'local') return res.send({ token })
  } catch (err) {
    log.error('session error', err)
    return res.status(500).send({ message: String(err) })
  }
}
