import { mw } from '@services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/logout-admin/logout-admin.controller'
export default async function LogoutAdmin(app: App, route: string): Promise<App> {
  return app.delete(`${route}:/id`, mw(['admin']), controller.logout())
}
