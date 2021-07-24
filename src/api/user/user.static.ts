import { Schema } from 'mongoose'
import { IUserDocument, IUserModel } from '@types/User'

export default (User: Schema<IUserDocument, IUserModel, undefined, any>) => {
  User.statics = {
    findByUsername(username: string) {
      return this.findOne({ username })
    },
    findByEmail(email: string) {
      return this.findOne({ email })
    },
    async loginByLocal(username: string, password: string) {
      try {
        const User = this

        const user = await User.findOne({
          provider: 'local',
          $or: [{ username }, { email: username }]
        }).exec()

        if (!user) return new Error(`${username} is not registered.`)

        const isMatch = await user.checkPassword(password)

        if (!isMatch) return new Error(`This password is not correct.`)

        user.lastLogin = new Date()

        const _user = await user.save()
        return _user
      } catch (error) {
        return error
      }
    }
  }
}
