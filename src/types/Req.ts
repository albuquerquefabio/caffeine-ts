import { Request } from '@tinyhttp/app'
import { IJWTSession } from './JWT'
export interface IReqQuery {
  search?: string | string[]
  page: number
  limit: number
}

export interface IReqUser extends Request {
  user: IJWTSession
}
