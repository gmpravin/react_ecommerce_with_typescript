import * as mongoose from 'mongoose';

export interface IsignUpSchema extends mongoose.Document {
  name: string;
  email: string;
  phone_no: number;
  password: string;
  created_date: Date;
  admin: string;
}
