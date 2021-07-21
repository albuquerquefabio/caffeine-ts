import type { ServerInfo } from 'redis'
export interface IRedisConfig {
  host?: string
  port?: string | number
  db?: number
  maxretries?: number
  auth?: boolean
  kea?: boolean

  secret?: string
  multiple?: boolean
  doNotSetClientName?: boolean
}

export interface IRedisCreate {
  key: string
  value: string
  ttl?: number
  allowMultiple?: boolean
}

export interface IRedisDriver {
  /**
   * Create data on redis
   * @param key string
   * @param value string
   * @param ttl number?
   * @param allowMultiple boolean? false as default
   * */
  create: (IRedisCreate: IRedisCreate) => Promise<boolean | string>
  /**
   * Exists by key */
  existsByKey: (key: string) => Promise<number | null>
  /**
   * Get ttl by key */
  getTTLByKey: (key: string) => Promise<number | null>
  /**
   * Get values by key */
  getValueByKey: (key: string) => Promise<string | null>
  /**
   * Get values by pattern */
  getValuesByPattern: (pattern: string) => Promise<string[] | null>
  /**
   * Get count by pattern */
  getCountByPattern: (pattern: string) => Promise<number | null>
  /**
   * Destroy by key or keys[]
   */
  destroy: (key: string) => Promise<number | null>
  /**
   * Destroy multiple by key
   */
  destroyMultiple: (key: string) => Promise<any | null>
  /**
   * @function getInfo()
   * @param section 'DBSIZE' @returns Return the number of keys in the selected database.
   * @param section ? @returns Get all information and statistics about the server.
   * @param section string[] @returns Get information and statistics about the server.
   */
  getInfo: (section?: string | string[]) => Promise<ServerInfo | number | null>
  /**
   * Ping the server.
   */
  ping: (message?: string) => Promise<string | null>
}

export type redisEventParams = 'ready' | 'connect' | 'disconnect' | 'reconnecting' | 'error' | 'end'
