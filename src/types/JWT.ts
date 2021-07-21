import { IUserDocument } from './User'
export interface IDataSession {
  ip: string
  agent: string
  date: string
}
export interface ISession {
  rjwt: string
  id: string
  iat: number
  dataSession?: IDataSession
  dataToken?: any | null
}

export interface IJWTSession extends IUserDocument {
  session: ISession
}

export interface IJWTToken {
  ttl?: number | null
  dataSession: IDataSession
  dataToken?: any | null
}
