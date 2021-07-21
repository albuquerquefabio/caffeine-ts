import User from '@models/User'
import type { Request, Response } from '@tinyhttp/app'
import type { IUserDocument } from 'Types/User'

export const controller = {
  create: () => async (req: Request, res: Response) => {
    const { username, name, lastname, email, password, provider }: IUserDocument = req.body

    try {
      const user = await User.create({
        username: username.replace(/' '/g, ''),
        name,
        lastname,
        email,
        password,
        provider
      })
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  read: () => async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const user = await User.findOne({ _id: id, roles: 'user' }).select('-password').exec()
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  list: () => async (req: Request, res: Response) => {
    const { search, page = 1, limit = 5 } = req.query

    let obj = {}
    search && (obj = { ...obj, $text: { $search: search } })
    const users = await User.paginate(obj, {
      page: +page,
      limit: +limit,
      sort: { createdAt: -1 }, // Order by create date DSC
      select: '-password'
    })

    res.send(users)
  },
  update: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { status } = req.body
      let obj = {}
      obj = typeof status === 'boolean' || status ? { ...obj, status } : { ...obj }

      const stmt = await User.updateOne(
        { _id: id },
        {
          $set: { ...obj }
        }
      ).exec()

      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  delete: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const stmt = await User.deleteMany({ _id: id }).exec()

      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
