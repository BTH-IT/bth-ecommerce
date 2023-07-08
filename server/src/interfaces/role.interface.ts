import { Document } from "mongoose";


export interface Role extends Document {
  name: String,
  description: String,
  actions: [String],
  isActive: Boolean
}