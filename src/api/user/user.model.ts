import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import type { IUserDocument, IUserModel } from 'src/@types/user'
import bcrypt from 'bcrypt'
import userStatic from '@api/user/user.static'

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'Email is required.']
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
    },
    lastname: {
      type: String,
      trim: true,
      default: ''
    },
    provider: {
      type: String,
      default: 'local'
    },
    roles: {
      type: Array,
      default: ['user']
    },
    status: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)
// Set unique fields
UserSchema.path('username').index({ unique: true })
UserSchema.path('email').index({ unique: true })
// Set searchable fields
UserSchema.index({
  username: 'text',
  email: 'text',
  name: 'text'
})

UserSchema.methods.fullName = function (): string {
  return `${this.name.trim()} ${this.lastname.trim()}`
}

UserSchema.methods.setPassword = async function (password: string) {
  const hash = await bcrypt.hash(password, 10)
  this.password = hash
}

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

UserSchema.pre(`save`, async function (this: IUserDocument, next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return next()
  } catch (error) {
    return next(error)
  }
})

UserSchema.post('save', function (err: any, doc: IUserDocument, next: any) {
  if (err?.name === 'MongoError' && err['code'] === 11000) {
    return next(`username "${doc.username}" not available.`)
  } else {
    return next(err)
  }
})

userStatic(UserSchema)

UserSchema.plugin(mongoosePaginate)

export default model<IUserDocument, IUserModel>('User', UserSchema)
