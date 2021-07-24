import type { App } from '@tinyhttp/app'
import Car from '@api/car/car.router'
import Thing from '@api/thing/thing.router'
import User from '@api/user/user.router'
import Me from '@api/me/me.router'

export default async function routers(app: App): Promise<void> {
  await Thing(app, '/api/things')
  await Car(app, '/api/cars')
  await User(app, '/api/users')
  await Me(app, '/api/me')
}
