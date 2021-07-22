import type { App } from '@tinyhttp/app'
import LocalAuth from './local'
import Logout from './logout'
import LogoutAdmin from './logout-admin'
import RedisInfo from './redis-info'
import Session from './session'
import SessionAdmin from './session-admin'

export default async function authRouters(app: App): Promise<void> {
  await LocalAuth(app, '/auth/local')
  await Session(app, '/auth/session')
  await SessionAdmin(app, '/auth/session/admin')
  await Logout(app, '/auth/logout')
  await LogoutAdmin(app, '/auth/session/admin/logout')
  await RedisInfo(app, '/auth/redis-info')
}
