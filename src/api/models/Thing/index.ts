import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema

const ThingSchema = new Schema(
  {
    name: String,
    info: String,
    status: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

ThingSchema.plugin(mongoosePaginate)

export default mongoose.model('Thing', ThingSchema)
