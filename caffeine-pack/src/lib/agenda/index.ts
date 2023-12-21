import { environment } from '@lib/environment'
import log from '@lib/logger'
import { sendQueue } from '@lib/rabbitmq'
import Agenda from 'agenda'
import { IAgenda } from 'src/@types/agenda/IAgenda'

export const agenda = new Agenda({
  db: {
    address: environment.mongoose.uri,
    collection: 'agendas'
  },
  processEvery: '30 seconds', // interval at which jobs are checked
  defaultConcurrency: 1, // max number of jobs that can be running at the same time
  maxConcurrency: 2, // max number of jobs that can be running at the same time
  defaultLockLifetime: 10000, // time in ms that a job can be locked for
  lockLimit: 0 // max number of jobs that can be locked at the same time
})

agenda.define<IAgenda['data']>('job', async (job, done) => {
  const { job: queue, content } = job.attrs.data

  if (queue && content) await sendQueue(queue, { content })

  done()
})

agenda.define<IAgenda['data']>('log', async (job, done) => {
  const { job: queue, content } = job.attrs.data

  log.info(queue, content)
  log.info('Scheduling job end at:', new Date().toISOString())

  done()
})

export const agendaSchedule = async (
  date: string | Date,
  name: IAgenda['name'],
  data: IAgenda['data']
): Promise<void> => {
  await agenda.schedule(date, name, data)
}
