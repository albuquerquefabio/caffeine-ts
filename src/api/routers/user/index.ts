import { controller } from '@controllers/user'
import { App } from '@tinyhttp/app'

export default async function User(app: App, route: string): Promise<App> {
  return app
    .post(route, controller.create())
    .get(route, controller.list())
    .get(`${route}/:id`, controller.read())
    .put(`${route}/:id`, controller.update())
    .delete(`${route}/:id`, controller.delete())
}
