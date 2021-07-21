import { IRedisDriver } from 'Types/RedisDriver'
import {
  setexAsync,
  setAsync,
  existsAsync,
  ttlAsync,
  getAsync,
  getAllAsync,
  mgetAsync,
  delAsync,
  dbsizeAsync,
  infoAsync,
  pingAsync
} from '@lib/redis'
import type { ServerInfo } from 'redis'

export const redisDriver: IRedisDriver = {
  create: async ({ key, value, ttl, allowMultiple = false }): Promise<boolean | string> => {
    try {
      const id = key.split(':')[0]
      if (!allowMultiple) {
        await redisDriver.destroyMultiple(id)
      }
      if (ttl) {
        await setexAsync(key, value, ttl)
      } else {
        await setAsync(key, value)
      }
      return true
    } catch (err) {
      throw `Error 1 Redis ${err}`
    }
  },
  existsByKey: async (key: string): Promise<number | null> => {
    try {
      const result = await existsAsync(key)
      return result ? result : null
    } catch (err) {
      return null
    }
  },
  getTTLByKey: async (key: string): Promise<number | null> => {
    try {
      const ttl = await ttlAsync(key)
      return ttl ? ttl : null
    } catch (err) {
      return null
    }
  },
  getValueByKey: async (key: string): Promise<string | null> => {
    try {
      const data = await getAsync(key)
      return data ? data : null
    } catch (err) {
      return null
    }
  },
  getValuesByPattern: async (pattern: string): Promise<string[] | null> => {
    try {
      const patternQuery = `${pattern}:*`
      const keys = await getAllAsync(patternQuery)
      const data = await mgetAsync(keys)
      return data && data.length ? data : null
    } catch (err) {
      return null
    }
  },
  getCountByPattern: async (pattern: string): Promise<number | null> => {
    try {
      const patternQuery = `${pattern}:*`
      const keys = await getAllAsync(patternQuery)
      return keys.length
    } catch (err) {
      return null
    }
  },
  destroy: async (key: string): Promise<number | null> => {
    try {
      return await delAsync(key)
    } catch (err) {
      return null
    }
  },
  destroyMultiple: async (key: string): Promise<number | null> => {
    try {
      const patternQuery = `${key}:*`
      const keys = await getAllAsync(patternQuery)
      return await delAsync(keys)
    } catch (err) {
      return null
    }
  },

  // INFO DB
  getInfo: async (section?: string | string[]): Promise<ServerInfo | number | null> => {
    try {
      if (section === 'DBSIZE' || section === 'dbsize') {
        return await dbsizeAsync()
      } else {
        return await infoAsync(section)
      }
    } catch (err) {
      return null
    }
  },
  ping: async (message?: string): Promise<string | null> => {
    try {
      return await pingAsync(message)
    } catch (err) {
      return null
    }
  }
}
