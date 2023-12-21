import userModel from '@api/user/user.model'
import log from '@lib/logger'
import { consumeQueue } from '@lib/rabbitmq'
import { hgetAsync } from '@lib/redis'
import { socketIO } from '@lib/socketIO'

export default async (): Promise<void> => {
  try {
    await consumeQueue('notification', async (msg) => {
      try {
        const { userId } = JSON.parse(msg.content.toString())

        const user = await userModel.findOne({ _id: userId }, 'name').lean().exec()

        if (!user) throw new Error('User not found')

        const socketId = await hgetAsync('socket', user._id)

        if (socketId) socketIO.io.emit('notification', { msg: 'You have a new notification' })
      } catch (error) {
        log.error('Error processing notification', String(error))
      }
    })
  } catch (error) {
    log.error('Error loading notification worker', String(error))
  }
}
