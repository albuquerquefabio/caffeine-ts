import { mw } from '@auth/services/mw.service'
import type { App } from '@tinyhttp/app'
import { controller } from '@auth/controllers/redis-info'
export default async function RedisInfo(app: App, route: string): Promise<App> {
  return app
    .get(route, mw(['admin']), controller.dbSize())
    .get(`${route}/:section`, mw(['admin']), controller.section())
}
