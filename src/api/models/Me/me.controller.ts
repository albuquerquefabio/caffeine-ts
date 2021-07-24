import type { IReqUser } from '@types/Req'
import type { Response } from '@tinyhttp/app'

// Get current user
export const controller = {
  me: () => async (req: IReqUser, res: Response) => {
    const { user } = req
    delete user.password
    delete user.session.id
    res.send(user)
  }
}
