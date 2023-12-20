import environment from '@env/index'
import { redisDriver } from '@lib/redis-driver/index'
import { jwt } from '@lib/jwt'
import { IJWTToken } from 'src/@types/jwt'
import { makeId } from '@lib/util'
export const Token = {
  create: async (_id: string, _options?: IJWTToken): Promise<string> => {
    try {
      const key = `${_id}:${makeId(11)}`
      // If have TTL
      const ttl = _options?.ttl || null
      const rjwt = key
      // If have dataSession save in Redis
      const session = _options?.dataSession ? { dataSession: _options.dataSession, rjwt } : { rjwt }
      // If have dataToken save in token
      const dataToken = _options?.dataToken || null

      // Sign JWT
      const token = await jwt.sign(key, dataToken)

      // Stringify info session
      const value = JSON.stringify(session)

      // Set in Redis
      await redisDriver.create({ key, value, ttl, allowMultiple: environment.redisJWT.multiple })

      return token
    } catch (error) {
      throw `${error}`
    }
  },
  verify: async (token: string, valueSession?: boolean) => {
    try {
      const decode = await jwt.verify(token)
      if (!decode) return false

      // Get key in redis
      const key = String(decode['rjwt'])

      // Verify if exists key in Redis
      if (!(await redisDriver.existsByKey(key))) return false

      // Get current TTL
      const ttl = await redisDriver.getTTLByKey(key)

      // Get Id
      const id = key.split(':')[0]

      // Merge objects
      Object.assign(decode, { id, ttl })

      if (valueSession) {
        const value = JSON.parse(await redisDriver.getValueByKey(key))
        if (value?.dataSession) Object.assign(decode, { dataSession: value?.dataSession })
      }
      return decode
    } catch (error) {
      throw `${error}`
    }
  }
}
