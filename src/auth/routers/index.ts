import type { App } from '@tinyhttp/app'
import LocalAuth from './local'

export default async function authRouters(app: App): Promise<void> {
  await LocalAuth(app, '/auth/local')
}
