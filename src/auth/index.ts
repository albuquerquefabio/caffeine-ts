import type { App } from '@tinyhttp/app'
import LocalAuth from '@auth/local/local.router'
import Logout from '@auth/logout/logout.router'
import LogoutAdmin from '@auth/logout-admin/logout-admin.router'
import RedisInfo from '@auth/redis-info/redis-info.router'
import Session from '@auth/session/session.router'
import SessionAdmin from '@auth/session-admin/session-admin.router'

export default async function authRouters(app: App): Promise<void> {
  await LocalAuth(app, '/auth/local')
  await Session(app, '/auth/session')
  await SessionAdmin(app, '/auth/session/admin')
  await Logout(app, '/auth/logout')
  await LogoutAdmin(app, '/auth/session/admin/logout')
  await RedisInfo(app, '/auth/redis-info')
}
