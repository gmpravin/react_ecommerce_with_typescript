import { Request, Response } from 'express';
import { ProductSchema } from '../models/products';
import * as mongoose from 'mongoose';
import { IProductSchema } from '../interface/products';
const Products = mongoose.model<IProductSchema>(
  'products',
  ProductSchema,
  'Products',
);

export class CategoryController {
  /**
   * Category
   */

  /**
   * getproducts
   */
  getCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    await Products.find({ product_category: category })
      .then(data => {
        if (data.length == 0) {
          res.json({ msg: "Don't have any products" });
        } else {
          res.json(data);
        }
      })
      .catch(err => console.log(err));
  };

  /**
   * getCategoryName
   */
  getCategoryName = async (req: Request, res: Response) => {
    await Products.find()
      .distinct('product_category')
      .then(data => {
        if (data.length == 0) {
          res.json({ msg: "Don't have any catagory" });
        } else {
          res.json(data);
        }
      })
      .catch(err => console.log(err));
  };

  /**
   * deleteproduct
   */
  deleteproduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Products.findByIdAndDelete(id)
      .then(data => res.json({ msg: 'Successfully deleted product ' }))
      .catch(err => res.json(err));
  };
}
