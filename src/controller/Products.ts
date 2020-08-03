import { Request, Response } from 'express';
import { ProductSchema } from '../models/products';
import * as mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { IProductSchema } from '../interface/products';
import * as cloudinary from 'cloudinary';

cloudinary.v2;
cloudinary.v2.config({
  cloud_name: 'XXXXXXXXXXX',
  api_key: 'XXXXXXXXXXX',
  api_secret: 'XXXXXXXXXXX',
});

const Products = mongoose.model<IProductSchema>(
  'products',
  ProductSchema,
  'Products',
);

export class ProductsController {
  /**
   * products
   */
  postproducts = async (req: Request, res: Response) => {
    const Result = validationResult(req);

    var errors = Result;

    if (!Result.isEmpty()) {
      res.json(errors);
    }

    cloudinary.v2.uploader
      .upload(req.files.product_images.tempFilePath, function(error, result) {
        return result;
      })
      .then(async url => {
        const {
          product_name,
          product_supplier,
          product_price,
          product_description,
          product_category,
        } = req.body;
        const data = {
          product_name,
          product_supplier,
          product_price,
          product_images: url.secure_url,
          product_description,
          product_category,
        };

        console.log(data);
        var products = new Products(data);
        await products
          .save()
          .then(msg => res.json({ msg: 'Successfully added' }))
          .catch(err => console.log(err));
      });
  };

  /**
   * getproducts
   */
  getproducts = async (req: Request, res: Response) => {
    await Products.find({})
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
   * deleteproduct
   */
  deleteproduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Products.findByIdAndDelete(id)
      .then(data => res.json({ msg: 'Successfully deleted product ' }))
      .catch(err => res.json(err));
  };

  /**
   * getProductById
   */
  getProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);

    await Products.findById(id)
      .then(data => {
        if (data === null) {
          res.json({ msg: 'Not Found' });
        } else {
          res.json(data);
        }
      })

      .catch(err => {
        console.log(err);
        res.json({ msg: 'null' });
      });
  };

  /**
   * UpdateProductById
   */
  UpdateProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = {
      product_name: req.body.product_name,
      product_supplier: req.body.product_supplier,
      product_price: req.body.product_price,
      product_images: {
        data: req.files.files.buffer,
        contentType: req.files.files.mimetype,
      },
    };
    await Products.findOneAndUpdate(id, data)
      .then(doc => {
        res.json({ msg: 'Successfully updated product' });
      })
      .catch(err => console.log(err));
  };
}
