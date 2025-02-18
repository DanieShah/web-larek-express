import { NextFunction, Request, Response } from "express";
import Product from '../models/products'
import { Error as MongooseError } from "mongoose";
import { BadRequestError } from "../errors/bad-request-error";
import { ConflictError } from "../errors/conflict-error";

export const getProducts =  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find({});
      return res.status(200).send({ items: products, total: products.length })
    } catch (err) {
        return next(err);
    }
};

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { title, image, description, price, category  } = req.body;
      const product = await Product.create({ title, image, description, price, category });
      return res.status(200).send(product);
    } catch (error) {

        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError(error.message));
          } 

          if (error instanceof Error && error.message.includes('E11000')) {
            return next(new ConflictError(error.message));
            } 

        return next(error);
    }
};