import type { Document, Model, PaginateModel } from 'mongoose'

export interface IUser {
  username: string
  password: string
  email: string
  name: string
  lastname?: string
  provider: string
  status?: boolean
  lastLogin?: Date
  roles?: string[]
}

export interface IUserDocument extends IUser, Document {
  fullName(): string
  setPassword: (password: string) => Promise<void>
  checkPassword: (password: string) => Promise<boolean>
}

export interface IUserModel extends Model<IUserDocument>, PaginateModel<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>
  findByEmail: (email: string) => Promise<IUserDocument>
  loginByLocal: (username: string, password: string) => Promise<IUserDocument>
}
