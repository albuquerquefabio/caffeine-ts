import { Schema, model } from 'mongoose'
import { IAgendaDocument, IAgendaModel } from 'src/@types/agenda/IAgenda'

const AgendaSchema: Schema<IAgendaDocument> = new Schema({
  name: { type: String, required: [true, 'Name is required.'] },
  data: {
    job: { type: String, required: [true, 'Job is required.'] },
    content: { type: String }
  },
  priority: { type: Number, default: 0 },
  shouldSaveResult: { type: Boolean, default: false },
  type: { type: String, default: 'normal' },
  nextRunAt: { type: Date },
  lastModifiedBy: { type: String },
  lockedAt: { type: Date },
  lastRunAt: { type: Date },
  lastFinishedAt: { type: Date }
})

AgendaSchema.index({ name: 1, 'data.ref': 1, 'data.job': 1 }, { background: true })
AgendaSchema.index({ nextRunAt: -1, lastRunAt: -1, lastFinishedAt: -1 }, { background: true })
AgendaSchema.index({ name: 1, disabled: 1, lockedAt: 1 }, { background: true })
// ttl index for lastFinishedAt in 6 minutes
AgendaSchema.index({ lastFinishedAt: 1 }, { expireAfterSeconds: 360, background: true })

export default model<IAgendaDocument, IAgendaModel>('Agenda', AgendaSchema)
