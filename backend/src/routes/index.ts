import {
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import productRouters from './products';
import orderRouter from './order';
import NotFoundError from '../errors/not-found-error';

const router = Router();

router.use('/product', productRouters);
router.use('/order', orderRouter);

router.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Запрос не сущетсвует'));
});

export default router;
