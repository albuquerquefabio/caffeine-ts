import type { App } from '@tinyhttp/app'
import Car from './car'
import Thing from './thing'
import User from './user'
import Me from './me'

export default async function routers(app: App): Promise<void> {
  await Thing(app, '/api/things')
  await Car(app, '/api/cars')
  await User(app, '/api/users')
  await Me(app, '/api/me')
}
