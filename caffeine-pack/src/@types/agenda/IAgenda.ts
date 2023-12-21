import { Document, Model } from 'mongoose'
import { IQueue } from 'src/@types/queue'

export interface IAgenda {
  name: 'job' | 'log'
  data: {
    job: IQueue['queue']
    content: string
  }
  priority?: number
  shouldSaveResult?: boolean
  type?: string
  nextRunAt?: Date | string
  lastModifiedBy?: string
  lockedAt?: Date | string
  lastRunAt?: Date | string
  lastFinishedAt?: Date | string
}

export type IAgendaDocument = IAgenda & Document

export type IAgendaModel = Model<IAgendaDocument>
