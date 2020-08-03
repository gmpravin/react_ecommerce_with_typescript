import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
  product_name: {
    type: String,
  },
  product_supplier: {
    type: String,
  },
  product_price: {
    type: String,
  },
  product_images: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  product_description: {
    type: String,
  },
  product_category: {
    type: String,
  },
});
