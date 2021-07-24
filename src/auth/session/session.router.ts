import { mw } from '@services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/session/session.controller'
export default async function Session(app: App, route: string): Promise<App> {
  return app.get(route, mw(), controller.list()).delete(`${route}/:id`, mw(), controller.destroy())
}
