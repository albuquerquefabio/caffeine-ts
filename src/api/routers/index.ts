import type { App } from '@tinyhttp/app'
import Car from './car'
import Thing from './thing'

export default async function routers(app: App): Promise<void> {
  // TODO -> Login Routes
  await Thing(app, '/api/things')
  await Car(app, '/api/cars')
}
