import {Schema} from 'mongoose';

export const RoleSchema = new Schema({
  name: String,
  description: String,
  actions: [String],
  isActive: Boolean
}, {
  timestamps: true,
  collection: "roles"
});