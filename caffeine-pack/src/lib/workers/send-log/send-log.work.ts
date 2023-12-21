import { agendaSchedule } from '@lib/agenda'
import log from '@lib/logger'
import { consumeQueue } from '@lib/rabbitmq'
import { socketIO } from '@lib/socketIO'

export default async (): Promise<void> => {
  try {
    await consumeQueue('sendLog', async (msg) => {
      try {
        const { content } = JSON.parse(msg.content.toString())
        socketIO.io.emit('log', content)
        // schedule another job, log 45 seconds lae
        await agendaSchedule(new Date(Date.now() + 45000), 'log', {
          job: 'log',
          content: `Log: ${content}`
        })
      } catch (error) {
        log.error('Error on sendLog worker: ', String(error))
      }
    })
  } catch (error) {
    log.error('Error on sendLog worker: ', String(error))
  }
}
