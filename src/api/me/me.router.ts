import { controller } from '@api/me/me.controller'
import { mw } from '@services/mw.service'
import type { App } from '@tinyhttp/app'

export default async function Me(app: App, route: string): Promise<App> {
  return app.get(route, mw(), controller.me())
}
