import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema

const CarSchema = new Schema(
  {
    brand: { type: String, required: [true, 'Brand is required.'] },
    model: { type: String, required: [true, 'Model is required.'] },
    year: Number,
    status: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

CarSchema.plugin(mongoosePaginate)

export default mongoose.model('Car', CarSchema)
