import { environment } from '@lib/environment'
import log from '@lib/logger'
import { Channel, connect, Connection, ConsumeMessage, Options } from 'amqplib'

import { TQueue } from 'src/@types/queue'

const { host, pass, user, port } = environment.rabbitmq
const HOST = `amqp://${user}:${pass}@${host}:${port}/`

const rabbitmqConnect = async (): Promise<Connection> => {
  try {
    const conn = await connect(HOST)
    log.success(`RabbitMQ -> connected: ${HOST}`)
    return conn
  } catch (error) {
    log.error('Rabbit MQ Connect ERROR', error)
    return error
  }
}

// create queue
const sendToQueue = async (
  channel: Channel,
  queue: TQueue,
  message: any,
  options: Options.Publish = {}
): Promise<boolean> => {
  try {
    const wasSent = channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true, ...options })
    return wasSent
  } catch (error) {
    log.error('Rabbit MQ createQueue ERROR', error)
    return error
  }
}

export const sendQueue = async (queue: TQueue, message: any, options: Options.Publish = {}) => {
  try {
    const conn = await rabbitmqConnect()
    const channel = await conn.createChannel()
    await channel.assertQueue(queue, { durable: true })
    // await channel.assertExchange(queue, 'fanout', { durable: true }) // https://www.rabbitmq.com/tutorials/amqp-concepts.html
    const wasSent = await sendToQueue(channel, queue, message, options)
    await channel.close()
    await conn.close()
    log.info(`${queue} has been sent to queue`)

    return wasSent
  } catch (error) {
    log.error('Rabbit MQ sendToQueue ERROR', error)
    return false
  }
}

export const consumeQueue = async (queue: TQueue, cb: (msg: ConsumeMessage) => void) => {
  try {
    const conn = await rabbitmqConnect()
    const channel = await conn.createChannel()
    await channel.prefetch(10)
    await channel.assertQueue(queue, { durable: true })
    await channel.consume(queue, cb, { noAck: true })
    // await channel.assertExchange(queue, 'topic', { durable: true }) // https://www.rabbitmq.com/tutorials/amqp-concepts.html
  } catch (error) {
    log.error('Rabbit MQ consumeQueue ERROR', error)
    return error
  }
}
