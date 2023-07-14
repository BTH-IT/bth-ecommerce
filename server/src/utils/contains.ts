import mongoose from 'mongoose';

export const ACTIONLIST = ['READ', 'CREATE', 'UPDATE', 'DELETE'];

export enum ACTION {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export const FEATURE = {
  PRODUCT: 'PRODUCT',
  USER: 'USER',
  WARRANTY: 'WARRANTY',
  TYPE: 'TYPE',
  SUPPLIER: 'SUPPLIER',
  ORDER: 'ORDER',
  ROLE: 'ROLE',
  IMPORT_ORDER: 'IMPORT ORDER',
  FEATURE: 'FEATURE',
  BRAND: 'BRAND',
  ACCOUNT: 'ACCOUNT',
  BANNER: 'BANNER',
};

export const ObjectId = mongoose.Types.ObjectId;
