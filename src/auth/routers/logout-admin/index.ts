import { mw } from '@auth/services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/controllers/logout-admin'
export default async function LogoutAdmin(app: App, route: string): Promise<App> {
  return app.delete(`${route}:/id`, mw(['admin']), controller.logout())
}
