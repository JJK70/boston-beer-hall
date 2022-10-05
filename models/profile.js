import mongoose from 'mongoose'

const Schema = mongoose.Schema

const snackSchema = new Schema({
  name: String,
  type: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favorites: [{ type: Schema.Types.ObjectId, ref:"Beer" }] ,
  snacks: [snackSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
