import * as mongoose from 'mongoose';

export interface IProductSchema extends mongoose.Document {
  product_name: string;
  product_description: string;
  product_supplier: string;
  product_price: string;
  product_images: string;
  product_category: string;
  created_date: Date;
}
