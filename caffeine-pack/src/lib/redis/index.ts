import { environment } from '@lib/environment'
import log from '@lib/logger'
import { promisify } from 'util'
import redis from 'redis'

// redis start
export const CLIENT = redis.createClient({ ...environment.redis })
// redis connection status
export async function redisConnect(): Promise<redis.RedisClient> {
  try {
    /* CLIENT.on('connect', () => {
      log.success(`Redis connect on redis://${environment.redis.host}:${environment.redis.port}`)
    })
    */
    CLIENT.on('error', (error) => {
      log.failed(`Redis -> connection on error: redis://${environment.redis.host}:${environment.redis.port}`, error)
      redisConnect()
      process.exit(-1)
    })

    log.success(`Redis -> connected on redis://${environment.redis.host}:${environment.redis.port}`)
    return CLIENT
  } catch (error) {
    log.fatal(`Redis -> connection error: redis://${environment.redis.host}:${environment.redis.port}`, error)
    process.exit(-1)
  }
}
// Redis CRUD
const voidSetAsync = (key: string, value: string, cb?: redis.Callback<'OK'>): void => {
  CLIENT.set(key, value, cb)
}
const voidHSetAsync = (arg: [string, ...Array<string>], cb?: redis.Callback<number>): void => {
  CLIENT.hset(arg, cb)
}
const voidSetExAsync = (key: string, value: string, ttl: number, cb?: redis.Callback<string>): void => {
  CLIENT.setex(key, ttl, value, cb)
}
const voidGet = (key: string, cb?: redis.Callback<string>): void => {
  CLIENT.get(key, cb)
}
const voidHGetAsync = (key: string, field: string, cb?: redis.Callback<string>): void => {
  CLIENT.hget(key, field, cb)
}
const voidGetAllAsync = (pattern: string, cb?: redis.Callback<Array<string>>): void => {
  CLIENT.keys(pattern, cb)
}
const voidHGetAllAsync = (key: string, cb?: redis.Callback<{ [key: string]: string }>): void => {
  CLIENT.hgetall(key, cb)
}
const voidMGetAsync = (query: string | Array<string>, cb?: redis.Callback<Array<string>>): void => {
  CLIENT.mget(query, cb)
}
const voidDelAsync = (key: string | Array<string>, cb?: redis.Callback<number>): void => {
  CLIENT.del(key, cb)
}
const voidHDelAsync = (key: string, field: string, value: string, cb?: redis.Callback<number>): void => {
  CLIENT.hdel(key, field, value, cb)
}
const voidExistsAsync = (key: string | Array<string>, cb?: redis.Callback<number>): void => {
  CLIENT.exists(key, cb)
}
const voidTtlAsync = (key: string, cb?: redis.Callback<number>): void => {
  CLIENT.ttl(key, cb)
}

// export Redis db info
const voidDbSize = (cb?: redis.Callback<number>): void => {
  CLIENT.dbsize(cb)
}
const voidInfo = (section?: string | Array<string>, cb?: redis.Callback<redis.ServerInfo>): void => {
  if (section) {
    CLIENT.info(section, cb)
  } else {
    CLIENT.info(cb)
  }
}
const voidPing = (message?: string, cb?: redis.Callback<string>): void => {
  if (message) {
    CLIENT.ping(message, cb)
  } else {
    CLIENT.ping(cb)
  }
}
// Promisify all redis crud/info function
export const setAsync = promisify(voidSetAsync)
export const hsetAsync = promisify(voidHSetAsync)
export const setexAsync = promisify(voidSetExAsync)
export const getAsync = promisify(voidGet)
export const hgetAsync = promisify(voidHGetAsync)
export const getAllAsync = promisify(voidGetAllAsync)
export const hgetAllAsync = promisify(voidHGetAllAsync)
export const mgetAsync = promisify(voidMGetAsync)
export const delAsync = promisify(voidDelAsync)
export const hdelAsync = promisify(voidHDelAsync)
export const existsAsync = promisify<string | Array<string>, number | null>(voidExistsAsync)
export const ttlAsync = promisify(voidTtlAsync)
// export Redis db info
/**
 * Return the number of keys in the selected database.
 */
export const dbsizeAsync = promisify(voidDbSize)

/**
 * Get information and statistics about the server.
 */
export const infoAsync = promisify(voidInfo)

/**
 * Ping the server.
 */
export const pingAsync = promisify(voidPing)
