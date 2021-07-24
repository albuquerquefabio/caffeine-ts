import { mw } from '@services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/session-admin/session-admin.controller'
export default async function SessionAdmin(app: App, route: string): Promise<App> {
  return app
    .get(`${route}/:id`, mw(['admin']), controller.list())
    .delete(`${route}/:id`, mw(['admin']), controller.destroy())
}
