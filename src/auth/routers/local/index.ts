import { callback } from '@auth/controllers/local'
import LocalStrategy from '@auth/strategy/local.strategy'
import type { App } from '@tinyhttp/app'

export default async function LocalAuth(app: App, route: string): Promise<App> {
  return app.post(route, LocalStrategy(), callback())
}
