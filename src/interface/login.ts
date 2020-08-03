import * as mongoose from 'mongoose';

export interface IloginSchema extends mongoose.Document {
  email: string;
  password: string;
  admin: number;
}
