import { environment } from '@lib/environment'
import { createAdapter } from '@socket.io/redis-adapter'
import { Server } from 'socket.io'
import { Emitter } from '@socket.io/redis-emitter'
import type { Socket } from 'socket.io'
import type redis from 'redis'
import log from '@lib/logger'
import { hsetAsync, hdelAsync } from '@lib/redis'

class SocketIO {
  private _io: Emitter | null = null

  get io(): Emitter {
    if (!this._io) {
      throw new Error('IO not initialized')
    }
    return this._io
  }

  async socketConnect(Redis: redis.RedisClient): Promise<void> {
    try {
      const IO = new Server(environment.socketIO.port, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        },
        allowEIO3: true
      })
      this._io = new Emitter(Redis)
      IO.adapter(createAdapter(Redis, Redis.duplicate()))

      IO.on('connection', async (socket) => await this.conn(IO, socket))
    } catch (error) {
      log.error('Failed to connect to socket server:', String(error))
    }
  }

  private async socketConnectInfo(io: Server) {
    log.success(`Socket connected on http://${environment.server.ip}:${environment.socketIO.port}`)
    const count = io.of('/').sockets.size
    log.info('Socket-> total clients', count)
  }

  private async saveSocketUserId(user: string | Array<string>, socketId: string): Promise<void> {
    try {
      await hsetAsync(['socket', String(user), socketId])
    } catch (error) {
      log.failed('ERROR: REDIS CANNOT SAVE IT', { user, socketId, error, date: new Date().toISOString() })
    }
  }

  private async removeSocketUserId(user: string | Array<string>, socketId: string): Promise<void> {
    try {
      await hdelAsync('socket', String(user), socketId)
    } catch (error) {
      log.failed('ERROR: REDIS CANNOT DELETE IT', { user, socketId, error, date: new Date().toISOString() })
    }
  }

  private async conn(io: Server, socket: Socket): Promise<void> {
    !environment.log || (await this.socketConnectInfo(io))

    // get user from handshake query
    const { _user = '' } = socket.handshake.query
    // save user on Redis
    if (_user.length) await this.saveSocketUserId(_user, socket.id)
    socket.on('disconnect', async () => {
      if (_user.length) await this.removeSocketUserId(_user, socket.id)
      if (environment.log) {
        const count = io.of('/').sockets.size
        log.info('Socket-> disconnect')
        log.info('Socket-> total clients', count)
      }
    })
  }
}

export const socketIO = new SocketIO()
