import environment from '@env/index'
import { createAdapter } from '@socket.io/redis-adapter'
import { Server } from 'socket.io'
import { Emitter } from '@socket.io/redis-emitter'
import type { Socket } from 'socket.io'
import type redis from 'redis'
import log from '@lib/logger'
import { hsetAsync, hdelAsync } from '@lib/redis'

const socketConnectInfo = async (io: Server) => {
  log.success(`Socket connected on http://${environment.server.ip}:${environment.socketIO.port}`)
  const count = io.of('/').sockets.size
  log.info(`Socket-> total clients`, count)
}

const saveSocketUserId = async (user: string | string[], socketId: string): Promise<void> => {
  try {
    await hsetAsync(['socket', String(user), socketId])
  } catch (error) {
    log.failed('ERROR: REDIS CANNOT SAVE IT', { user, socketId, error, date: new Date().toISOString() })
  }
}

const removeSocketUserId = async (user: string | string[], socketId: string): Promise<void> => {
  try {
    await hdelAsync('socket', String(user), socketId)
  } catch (error) {
    log.failed('ERROR: REDIS CANNOT DELETE IT', { user, socketId, error, date: new Date().toISOString() })
  }
}

const conn = async (io: Server, socket: Socket): Promise<void> => {
  !environment.log || (await socketConnectInfo(io))

  // get user from handshake query
  const { _user = '' } = socket.handshake.query
  // save user on Redis
  if (_user.length) await saveSocketUserId(_user, socket.id)
  socket.on('disconnect', async () => {
    if (_user.length) await removeSocketUserId(_user, socket.id)
    if (environment.log) {
      const count = io.of('/').sockets.size
      log.info('Socket-> disconnect')
      log.info(`Socket-> total clients`, count)
    }
  })
}

export let io: Emitter

export async function socketConnect(Redis: redis.RedisClient): Promise<void> {
  const IO = new Server(environment.socketIO.port)
  io = new Emitter(Redis)
  IO.adapter(createAdapter(Redis, Redis.duplicate()))

  IO.on('connection', async (socket) => await conn(IO, socket))
}
