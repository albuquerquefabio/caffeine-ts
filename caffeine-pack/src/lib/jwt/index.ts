import { environment } from '@lib/environment'
import jwtModule from 'jsonwebtoken'
// import { sign, verify } from 'jsonwebtoken'

export const jwt = {
  sign: async (rjwt: string, dataToken?: any) => {
    // rjwt -> redis jwt
    const value = { rjwt }
    if (dataToken) {
      Object.assign(value, { dataToken })
    }
    return jwtModule.sign(value, environment.secret)
  },
  verify: async (token: string) => {
    return jwtModule.verify(token, environment.secret)
  }
}
