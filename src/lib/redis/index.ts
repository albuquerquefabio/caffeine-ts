import environment from '@env/index'
import log from '@lib/logger'
import { promisify } from 'util'
import redis from 'redis'

export const CLIENT = redis.createClient({ ...environment.redis })

export async function redisConnect(): Promise<redis.RedisClient> {
  try {
    CLIENT.on('connect', () => {
      log.success(`Redis connect on redis://${environment.redis.host}:${environment.redis.port}`)
    })

    CLIENT.on('error', (error) => {
      log.fatal(`Redis -> connection error: redis://${environment.redis.host}:${environment.redis.port}`, error)
      process.exit(-1)
    })
    return CLIENT
  } catch (error) {
    log.fatal(`Redis -> connection error: redis://${environment.redis.host}:${environment.redis.port}`, error)
    process.exit(-1)
  }
}

const voidSetAsync = (key: string, value: string, cb?: redis.Callback<'OK'>): void => {
  CLIENT.set(key, value, cb)
}
const voidHSetAsync = (arg: [string, ...string[]], cb?: redis.Callback<number>): void => {
  CLIENT.hset(arg, cb)
}
const voidGet = (key: string, cb?: redis.Callback<string>): void => {
  CLIENT.get(key, cb)
}
const voidHGetAsync = (key: string, field: string, cb?: redis.Callback<string>): void => {
  CLIENT.hget(key, field, cb)
}
const voidGetAllAsync = (pattern: string, cb?: redis.Callback<string[]>): void => {
  CLIENT.keys(pattern, cb)
}
const voidHGetAllAsync = (key: string, cb?: redis.Callback<{ [key: string]: string }>): void => {
  CLIENT.hgetall(key, cb)
}
const voidDelAsync = (key: string, cb?: redis.Callback<number>): void => {
  CLIENT.del(key, cb)
}
const voidHDelAsync = (key: string, field: string, value: string, cb?: redis.Callback<number>): void => {
  CLIENT.hdel(key, field, value, cb)
}
export const setAsync = promisify(voidSetAsync)
export const hsetAsync = promisify(voidHSetAsync)
export const getAsync = promisify(voidGet)
export const hgetAsync = promisify(voidHGetAsync)
export const getAllAsync = promisify(voidGetAllAsync)
export const hgetAllAsync = promisify(voidHGetAllAsync)
export const delAsync = promisify(voidDelAsync)
export const hdelAsync = promisify(voidHDelAsync)
