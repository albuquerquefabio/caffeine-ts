import { io } from '@lib/socketIO'
import Car from '@models/Car'
import type { Request, Response } from '@tinyhttp/app'

export const controller = {
  create: () => async (req: Request, res: Response) => {
    try {
      // Data request
      const { brand, model, year } = req.body
      // Create Document at Car collection
      const stmt = await Car.create({ brand, model, year })
      // Socket Emitter
      io.emit('cars:add', stmt)
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  read: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const car = await Car.findOne({ _id: id }).exec()

      res.send(car)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  list: () => async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1 } = req.query
      const query = {} // {} to get all
      const cars = await Car.paginate(query, {
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
      const { brand, model, year, status } = req.body
      let obj = {}
      obj = typeof status === 'boolean' || status ? { ...obj, status } : { ...obj }
      brand && (obj = { ...obj, brand })
      model && (obj = { ...obj, model })
      year && (obj = { ...obj, year: +year })
      const stmt = await Car.updateOne(
        { _id: id },
        {
          $set: { ...obj }
        }
      ).exec()
      io.emit('cars:update', { _id: id, ...obj, stmt })
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  delete: () => async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const stmt = await Car.deleteOne({ _id: id }).exec()
      io.emit('cars:delete', { _id: id, stmt })
      res.send(stmt)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
