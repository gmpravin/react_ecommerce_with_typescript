import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const loginSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  admin: {
    type: Number,
  },
});
