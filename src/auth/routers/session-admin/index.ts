import { mw } from '@auth/services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/controllers/session-admin'
export default async function SessionAdmin(app: App, route: string): Promise<App> {
  return app
    .get(`${route}/:id`, mw(['admin']), controller.list())
    .delete(`${route}/:id`, mw(['admin']), controller.destroy())
}
