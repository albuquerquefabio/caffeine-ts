import log from '@lib/logger'
import notificationWork from './notification/notification.work'

export default async function startRabbitMQWorkers() {
  const workers = await Promise.allSettled([notificationWork()])
  workers
    .filter((worker) => worker.status === 'rejected')
    .forEach((worker: PromiseRejectedResult) => {
      log.error('Worker failed at: ', new Date().toISOString())
      log.error(String(worker.reason))
    })
}
