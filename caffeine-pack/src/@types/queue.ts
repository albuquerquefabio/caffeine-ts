export type TQueue = 'notification' | 'sendLog' | 'log'

export interface IQueue {
  queue: TQueue
}
