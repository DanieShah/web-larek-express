import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/products';
import BadRequestError from '../errors/bad-request-error';

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const { total, items, payment } = order;
    const productBase = await Product.find({});
    let totalPrice: number = 0;

    items.forEach((id: string) => {
      const productForOrder = productBase.find((prod) => String(prod._id) === id);
      if (!productForOrder) {
        return next(new BadRequestError('Товара с данным id не существует'));
      }
      totalPrice += productForOrder.price;
      return totalPrice;
    });

    if (payment !== 'online') {
      if (payment !== 'card') {
        return next(new BadRequestError('Неправильно выбран тип оплаты'));
      }
    }

    if (totalPrice !== total) {
      return next(new BadRequestError(`Сумма указанная в запросе ${totalPrice} не совпадает с ${total}`));
    }

    return res.status(200).send({
      id: faker.string.uuid(),
      total,
    });
  } catch (err) {
    return next(err);
  }
};

export default postOrder;
