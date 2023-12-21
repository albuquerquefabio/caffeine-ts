import { callback } from '@auth/local/local.controller'
import LocalStrategy from '@auth/local/local.strategy'
import type { App } from '@tinyhttp/app'

export default async function LocalAuth(app: App, route: string): Promise<App> {
  return app.post(route, LocalStrategy(), callback())
}
