import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/products';
import BadRequestError from '../errors/bad-request-error';

enum Payment {
    card = 'card',
    online = 'online'
}

interface IOrder {
    'payment': Payment,
    'email': string,
    'phone': string,
    'address': string,
    'total': number,
    'items': string[]
}

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order: IOrder = req.body;

  const { total, items } = order;

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

  if (totalPrice !== total) {
    return next(new BadRequestError(`Сумма указанная в запросе ${totalPrice} не совпадает с ${total}`));
  }

  return res.status(201).send({
    id: faker.string.uuid(),
    total,
  });
};

export default postOrder;
