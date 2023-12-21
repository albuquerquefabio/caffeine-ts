import { socketIO } from '@lib/socketIO'
import Thing from '@api/thing/thing.model'
import type { Request, Response } from '@tinyhttp/app'
import { agendaSchedule } from '@lib/agenda'
import log from '@lib/logger'

export const controller = {
  create: () => async (req: Request, res: Response) => {
    try {
      // Data request
      const { name, info } = req.body
      // Create Document at Thing collection
      const stmt = await Thing.create({ name, info })
      // Socket Emitter
      socketIO.io.emit('things:add', stmt)
      // schedule job 30 seconds later
      log.info('Scheduling job at:', new Date().toISOString())
      await agendaSchedule(new Date(Date.now() + 10000), 'job', {
        job: 'sendLog',
        content: `Thing ${name} created`
      })
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  read: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const car = await Thing.findOne({ _id: id }).exec()

      res.send(car)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  list: () => async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1 } = req.query
      const query = {} // {} to get all
      const cars = await Thing.paginate(query, {
        page: +page,
        limit: +limit,
        sort: { createdAt: -1 } // Order By Create Date DSC
      })
      res.send(cars)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  update: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name, info, status } = req.body
      let obj = {}
      name && (obj = { ...obj, name })
      info && (obj = { ...obj, info })
      status && (obj = { ...obj, status })
      const stmt = await Thing.updateOne(
        { _id: id },
        {
          $set: { ...obj }
        }
      ).exec()
      socketIO.io.emit('things:update', { _id: id, ...obj, stmt })
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  delete: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const stmt = await Thing.deleteOne({ _id: id }).exec()
      socketIO.io.emit('things:delete', { _id: id, stmt })
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
