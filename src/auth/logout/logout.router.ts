import { mw } from '@services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/logout/logout.controller'
export default async function Logout(app: App, route: string): Promise<App> {
  return app.delete(route, mw(), controller.logout())
}
