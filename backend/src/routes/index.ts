import { Router } from 'express';
import productRouters from './products';
import orderRouter from './order';

const router = Router();

router.use('/product', productRouters);
router.use('/order', orderRouter);

export default router;
