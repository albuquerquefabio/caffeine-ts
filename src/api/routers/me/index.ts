import { controller } from '@controllers/me'
import { mw } from '@auth/services/mw.service'
import type { App } from '@tinyhttp/app'

export default async function Me(app: App, route: string): Promise<App> {
  return app.get(route, mw(), controller.me())
}
