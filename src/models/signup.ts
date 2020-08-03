import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const signUpSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  password: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Intl,
  },
});
