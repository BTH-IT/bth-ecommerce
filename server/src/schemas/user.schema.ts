import {Schema} from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  password: String,
  picture: String,
  role: { type: Schema.Types.ObjectId, ref: 'role' },
  type: String,
}, {
  timestamps: true,
  collection: "users"
});