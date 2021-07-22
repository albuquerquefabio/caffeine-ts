import { mw } from '@auth/services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/controllers/logout'
export default async function Logout(app: App, route: string): Promise<App> {
  return app.delete(route, mw(), controller.logout())
}
