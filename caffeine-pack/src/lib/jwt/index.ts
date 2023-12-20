import environment from '@env/index'
import { sign, verify } from 'jsonwebtoken'

export const jwt = {
  sign: async (rjwt: string, dataToken?: any) => {
    // rjwt -> redis jwt
    const value = { rjwt }
    if (dataToken) {
      Object.assign(value, { dataToken })
    }
    return sign(value, environment.secret)
  },
  verify: async (token: string) => {
    return verify(token, environment.secret)
  }
}
