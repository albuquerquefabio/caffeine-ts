import { controller } from '@api/thing/thing.controller'
import type { App } from '@tinyhttp/app'
export default async function Thing(app: App, route: string): Promise<App> {
  return app
    .post(route, controller.create())
    .get(route, controller.list())
    .get(`${route}/:id`, controller.read())
    .put(`${route}/:id`, controller.update())
    .delete(`${route}/:id`, controller.delete())
}
