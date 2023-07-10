import mongoose from 'mongoose';

export const ACTIONLIST = ['READ', 'CREATE', 'UPDATE', 'DELETE'];

export enum ACTION {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export const ObjectId = mongoose.Types.ObjectId;
