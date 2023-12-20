import { Request } from '@tinyhttp/app'
import { IJWTSession } from './jwt'
export interface IReqQuery {
  search?: string | Array<string>
  page: number
  limit: number
}

export interface IReqUser extends Request {
  user: IJWTSession
}
