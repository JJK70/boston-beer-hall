import mongoose from 'mongoose'

const Schema = mongoose.Schema

const beerSchema = new Schema({
  name: String,
  great: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Beer = mongoose.model('Beer', beerSchema)

export {
  Beer
}